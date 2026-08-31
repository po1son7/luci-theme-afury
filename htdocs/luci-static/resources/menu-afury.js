'use strict';
'require baseclass';
'require ui';

return baseclass.extend({
	__init__() {
		ui.menu.load().then((tree) => {
			this.render(tree);
			this.syncHeaderHeight();
		});
		this.bindMenuDismiss();
		this.bindDarkToggle();
		window.addEventListener('resize', () => this.syncHeaderHeight());
	},

	syncHeaderHeight() {
		const header = document.querySelector('header');
		if (!header)
			return;
		const h = Math.ceil(header.getBoundingClientRect().height);
		if (h > 0)
			document.documentElement.style.setProperty('--rect-header-h', h + 'px');
	},

	bindDarkToggle() {
		const box = document.querySelector('#indicators');
		if (!box || box.querySelector('[data-rect-dark]'))
			return;

		const btn = E('button', {
			type: 'button',
			class: 'rect-mode-toggle',
			'data-rect-dark': '1',
			'aria-label': document.documentElement.getAttribute('data-darkmode') === 'true'
				? '切换为浅色'
				: '切换为深色'
		}, [
			E('span', { 'class': 'rect-mode-sun', 'aria-hidden': 'true' }),
			E('span', { 'class': 'rect-mode-moon', 'aria-hidden': 'true' })
		]);

		btn.addEventListener('click', (ev) => {
			ev.preventDefault();
			const next = document.documentElement.getAttribute('data-darkmode') !== 'true';
			document.documentElement.setAttribute('data-darkmode', next ? 'true' : 'false');
			try {
				localStorage.setItem('afury-darkmode', next ? '1' : '0');
			}
			catch (e) {}
			btn.setAttribute('aria-label', next ? '切换为浅色' : '切换为深色');
		});

		box.prepend(btn);
	},

	bindMenuDismiss() {
		document.addEventListener('click', (ev) => {
			if (ev.target.closest('#topmenu'))
				return;
			document.querySelectorAll('#topmenu > li.dropdown.open').forEach((node) => {
				if (!node.classList.contains('active'))
					node.classList.remove('open');
			});
		});
	},

	closeMenus(except) {
		document.querySelectorAll('#topmenu > li.dropdown.open').forEach((node) => {
			if (node !== except)
				node.classList.remove('open');
		});
	},

	render(tree) {
		let node = tree;
		let url = '';

		this.renderModeMenu(tree);

		if (L.env.dispatchpath.length >= 3) {
			for (var i = 0; i < 3 && node; i++) {
				node = node.children[L.env.dispatchpath[i]];
				url = url + (url ? '/' : '') + L.env.dispatchpath[i];
			}

			if (node)
				this.renderTabMenu(node, url);
		}
	},

	renderTabMenu(tree, url, level) {
		const container = document.querySelector('#tabmenu');
		const ul = E('ul', { 'class': 'tabs' });
		const children = ui.menu.getChildren(tree);
		let activeNode = null;

		children.forEach(child => {
			const isActive = (L.env.dispatchpath[3 + (level || 0)] == child.name);
			const activeClass = isActive ? ' active' : '';
			const className = 'tabmenu-item-%s %s'.format(child.name, activeClass);

			ul.appendChild(E('li', { 'class': className }, [
				E('a', { 'href': L.url(url, child.name) }, [ _(child.title) ])]));

			if (isActive)
				activeNode = child;
		});

		if (ul.children.length == 0)
			return E([]);

		container.appendChild(ul);
		container.style.display = '';

		if (activeNode)
			this.renderTabMenu(activeNode, url + '/' + activeNode.name, (level || 0) + 1);

		ul.querySelectorAll('li.dropdown > a').forEach((anchor) => {
			anchor.addEventListener('click', (ev) => {
				const li = ev.currentTarget.parentElement;
				if (!li || !li.querySelector(':scope > .dropdown-menu'))
					return;
				ev.preventDefault();
				ev.stopPropagation();
				const open = li.classList.contains('open');
				ul.querySelectorAll('li.dropdown.open').forEach((node) => {
					if (node !== li)
						node.classList.remove('open');
				});
				if (!open)
					li.classList.add('open');
			});
		});

		return ul;
	},

	renderMainMenu(tree, url, level) {
		const ul = level ? E('ul', { 'class': 'dropdown-menu' }) : document.querySelector('#topmenu');
		const children = ui.menu.getChildren(tree);
		const depth = level || 0;

		if (children.length == 0 || depth > 1)
			return E([]);

		children.forEach(child => {
			if (/argon/i.test(child.name || '') || /argon/i.test(child.title || ''))
				return;

			const submenu = this.renderMainMenu(child, url + '/' + child.name, depth + 1);
			const hasChild = !depth && submenu.firstElementChild;
			const isCurrent = L.env.dispatchpath[depth + 1] === child.name;
			const subclass = [
				hasChild ? 'dropdown' : '',
				isCurrent ? 'active' : ''
			].filter(Boolean).join(' ');
			const linkclass = hasChild ? 'menu' : '';
			const linkurl = hasChild ? '#' : L.url(url, child.name);

			const anchor = E('a', { 'class': linkclass, 'href': linkurl }, [
				_(child.title),
			]);

			if (hasChild) {
				let ignoreClick = false;
				const toggle = (ev) => {
					ev.preventDefault();
					ev.stopPropagation();
					const li = ev.currentTarget.parentElement;
					const open = li.classList.contains('open');
					this.closeMenus();
					if (!open)
						li.classList.add('open');
					this.syncHeaderHeight();
				};
				anchor.addEventListener('pointerup', (ev) => {
					if (ev.pointerType === 'mouse')
						return;
					ignoreClick = true;
					toggle(ev);
				});
				anchor.addEventListener('click', (ev) => {
					if (ignoreClick) {
						ev.preventDefault();
						ev.stopPropagation();
						ignoreClick = false;
						return;
					}
					toggle(ev);
				});
			}

			const li = E('li', { 'class': subclass }, [
				anchor,
				submenu
			]);

			ul.appendChild(li);
		});

		ul.style.display = '';

		return ul;
	},

	renderModeMenu(tree) {
		const ul = document.querySelector('#modemenu');
		const children = ui.menu.getChildren(tree);

		children.forEach((child, index) => {
			const isActive = L.env.requestpath.length
				? child.name === L.env.requestpath[0]
				: index === 0;

			ul.appendChild(E('li', { 'class': isActive ? 'active' : '' }, [
				E('a', { 'href': L.url(child.name) }, [ _(child.title) ])
			]));

			if (isActive)
				this.renderMainMenu(child, child.name);
		});

		if (ul.children.length > 1)
			ul.style.display = '';
	}
});
