(function () {
	const root = document.documentElement;
	const key = "afury-darkmode";
	const params = new URLSearchParams(location.search);
	let dark;
	if (params.has("dark"))
		dark = params.get("dark") !== "0";
	else {
		const stored = localStorage.getItem(key);
		dark = stored === null ? true : stored === "1";
	}

	function apply(next) {
		root.setAttribute("data-darkmode", next ? "true" : "false");
		try { localStorage.setItem(key, next ? "1" : "0"); } catch (e) {}
		document.querySelectorAll(".rect-mode-toggle").forEach((t) => {
			t.setAttribute("aria-label", next ? "切换为浅色" : "切换为深色");
		});
		document.querySelectorAll("[data-rect-toggle]").forEach((btn) => {
			btn.textContent = next ? "Light" : "Dark";
		});
	}

	apply(dark);

	document.querySelectorAll(".rect-mode-toggle, [data-rect-toggle]").forEach((btn) => {
		btn.addEventListener("click", (ev) => {
			ev.preventDefault();
			apply(root.getAttribute("data-darkmode") !== "true");
		});
	});

	document.querySelectorAll(".nav .dropdown > a").forEach((a) => {
		a.addEventListener("click", (ev) => ev.preventDefault());
	});
})();
