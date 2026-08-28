'use strict';
'require ui';
'require view';

function wordmark() {
	const host = document.createElement('div');
	host.innerHTML = '<svg class="brand-logo" viewBox="0 0 112 36" fill="none" role="img" aria-label="Afury" width="112" height="36"><title>Afury</title><g fill="currentColor"><path fill-rule="evenodd" d="M14.8 2.5 1 26h4.2l2.35-5.6h10.9L20.8 26h4.2L14.8 2.5Zm0 6.2 3.85 9.15h-7.7L14.8 8.7Z"/><path d="M32.4 26V9c0-3.7 2.15-5.95 5.9-5.95H45.6V5.8h-6.55c-1.9 0-3.05 1.15-3.05 3.35v4.05h7.35v2.45H36V26h-3.6Z"/><path d="M49.2 11.45h3.25v8.2c0 2.75 1.3 4.35 3.95 4.35s3.95-1.6 3.95-4.35v-8.2h3.25v8.35c0 4.55-2.7 7.2-7.2 7.2s-7.2-2.65-7.2-7.2v-8.35Z"/><path d="M70.2 11.45h3.25v1.95c.95-1.45 2.3-2.2 4.05-2.2v3.05c-.28-.05-.58-.08-.88-.08-1.9 0-3.17 1.2-3.17 3.55V26H70.2V11.45Z"/><path d="M85.15 11.45h3.4l4.75 8.15 4.75-8.15h3.45L95.3 22.4V33.6h-3.3V22.4l-6.85-10.95Z"/></g><rect fill="#0496D4" x="8.2" y="15.55" width="13.2" height="3.15" rx="1.55"/></svg>';
	return host.firstElementChild;
}

function modeToggle(existing) {
	const toggle = existing || E('button', {
		type: 'button',
		class: 'rect-mode-toggle',
		'data-rect-dark': '1'
	}, [
		E('span', { 'class': 'rect-mode-sun', 'aria-hidden': 'true' }),
		E('span', { 'class': 'rect-mode-moon', 'aria-hidden': 'true' })
	]);

	toggle.setAttribute('type', 'button');
	toggle.setAttribute('aria-label',
		document.documentElement.getAttribute('data-darkmode') === 'true' ? '切换为浅色' : '切换为深色');
	return toggle;
}

function decorateLogin(dlg) {
	if (!dlg)
		return;

	let head = dlg.querySelector('.login-head');
	if (!head) {
		head = E('div', { 'class': 'login-head' });
		const title = dlg.querySelector('h4, .cbi-modal-title');
		if (title)
			title.parentNode.insertBefore(head, title);
		else
			dlg.prepend(head);
	}
	else {
		const title = dlg.querySelector('h4, .cbi-modal-title');
		if (title && title.previousElementSibling !== head)
			title.parentNode.insertBefore(head, title);
	}

	let brand = head.querySelector('.login-brand');
	if (!brand) {
		brand = E('div', { 'class': 'login-brand' });
		head.prepend(brand);
	}

	if (!brand.querySelector('.brand-logo'))
		brand.replaceChildren(wordmark());

	const existingToggle = head.querySelector('.rect-mode-toggle');
	if (existingToggle)
		modeToggle(existingToggle);
	else
		head.appendChild(modeToggle());
}

function startLogin(dlg, form) {
	if (form.getAttribute('data-rect-logging') === '1')
		return;
	form.setAttribute('data-rect-logging', '1');
	dlg.querySelectorAll('*').forEach((node) => {
		node.style.display = 'none';
	});
	dlg.appendChild(E('div', {
		class: 'spinning'
	}, _('Logging in…')));
	HTMLFormElement.prototype.submit.call(form);
}

return view.extend({
	render() {
		const form = document.querySelector('form');

		const dlg = ui.showModal(
			_('Authorization Required'),
			Array.from(document.querySelectorAll('section > *')),
			'login'
		);

		decorateLogin(dlg);

		form.addEventListener('submit', (ev) => {
			ev.preventDefault();
			startLogin(dlg, form);
		});

		form.addEventListener('keydown', (ev) => {
			if (ev.key !== 'Enter')
				return;
			if (ev.target.closest && ev.target.closest('.rect-mode-toggle'))
				return;
			ev.preventDefault();
			ev.stopPropagation();
			startLogin(dlg, form);
		});

		document.querySelector('input[type="password"]').focus();

		return '';
	},

	addFooter() {},

});
