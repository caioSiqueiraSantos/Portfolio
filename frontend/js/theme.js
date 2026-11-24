(() => {
  const root = document.documentElement;
  const storageKey = "portfolio-theme";

  try {
    if (localStorage.getItem(storageKey) === "dark") root.dataset.theme = "dark";
  } catch {
    // The toggle still works when storage is unavailable.
  }

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".theme-toggle");
    const themeColor = document.querySelector('meta[name="theme-color"]');

    function updateToggle() {
      const dark = root.dataset.theme === "dark";
      toggle.setAttribute("aria-pressed", String(dark));
      toggle.title = dark ? "Ativar modo claro" : "Ativar modo escuro";
      themeColor.content = getComputedStyle(root).getPropertyValue("--background").trim();
    }

    toggle.addEventListener("click", () => {
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
      updateToggle();

      try {
        localStorage.setItem(storageKey, root.dataset.theme);
      } catch {
        // Keep the current theme for this page.
      }
    });

    updateToggle();
    toggle.hidden = false;
  });
})();
