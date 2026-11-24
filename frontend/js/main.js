function setupNavigation() {
  const header = document.querySelector(".site-header");
  const nav = document.getElementById("primary-nav");
  const toggle = document.querySelector(".menu-toggle");
  const compact = window.matchMedia("(max-width: 63.9375rem)");
  const links = Array.from(nav.querySelectorAll("a[href^='#']"));
  const sections = links.map((link) => document.querySelector(link.hash));

  function setMenu(open) {
    nav.hidden = compact.matches && !open;
    toggle.setAttribute("aria-expanded", String(compact.matches && open));
  }

  function syncMenu() {
    const focused = document.activeElement;
    toggle.hidden = !compact.matches;
    setMenu(false);

    if (compact.matches && nav.contains(focused)) toggle.focus();
    if (!compact.matches && focused === toggle) links[0].focus();
  }

  toggle.addEventListener("click", () => {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  header.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      toggle.focus();
    }
  });

  links.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      if (!compact.matches || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const section = sections[index];
      section.setAttribute("tabindex", "-1");
      section.focus({ preventScroll: true });
      setMenu(false);
    });
  });

  let frame;
  function updateCurrentSection() {
    frame = undefined;
    const offset = header.getBoundingClientRect().bottom + 24;
    const current = sections.findLastIndex((section) => section.getBoundingClientRect().top <= offset);

    links.forEach((link, index) => {
      if (index === current) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function scheduleSectionUpdate() {
    if (frame === undefined) frame = requestAnimationFrame(updateCurrentSection);
  }

  header.classList.add("menu-enhanced");
  syncMenu();
  compact.addEventListener("change", syncMenu);
  window.addEventListener("scroll", scheduleSectionUpdate, { passive: true });
  window.addEventListener("resize", scheduleSectionUpdate);
  window.addEventListener("load", scheduleSectionUpdate);
  updateCurrentSection();
}

function setupProjectFilters() {
  const filters = document.querySelector(".filter-bar");
  const buttons = Array.from(filters.querySelectorAll("button"));
  const projects = Array.from(document.querySelectorAll("#projects-container .project"));
  const results = document.getElementById("project-results");

  function applyFilter(button) {
    const filter = button.dataset.filter;
    buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    projects.forEach((project) => {
      project.hidden = filter !== "all" && project.dataset.group !== filter;
    });

    const count = projects.filter((project) => !project.hidden).length;
    results.textContent = count === 1 ? "1 projeto exibido." : count + " projetos exibidos.";
  }

  buttons.forEach((button) => button.addEventListener("click", () => applyFilter(button)));
  filters.hidden = false;

  return function revealProject(target) {
    const project = target.closest(".project");
    if (!project?.hidden) return false;

    applyFilter(buttons[0]);
    return true;
  };
}

function setupEngineeringTabs() {
  const tablist = document.querySelector(".engineering-tabs");
  const tabs = Array.from(tablist.querySelectorAll("button"));
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));
  const stacked = window.matchMedia("(max-width: 48rem)");

  function selectTab(index, focus = false) {
    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === index;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[tabIndex].hidden = !selected;
    });

    if (focus) tabs[index].focus();
  }

  function syncOrientation() {
    tablist.setAttribute("aria-orientation", stacked.matches ? "horizontal" : "vertical");
  }

  tablist.setAttribute("role", "tablist");
  syncOrientation();
  stacked.addEventListener("change", syncOrientation);

  tabs.forEach((tab, index) => {
    tab.setAttribute("role", "tab");
    panels[index].setAttribute("role", "tabpanel");
    panels[index].setAttribute("aria-labelledby", tab.id);
    panels[index].tabIndex = 0;
    tab.addEventListener("click", () => selectTab(index));
    tab.addEventListener("keydown", (event) => {
      const previousKey = stacked.matches ? "ArrowLeft" : "ArrowUp";
      const nextKey = stacked.matches ? "ArrowRight" : "ArrowDown";
      let next;
      if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else if (event.key === previousKey) next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === nextKey) next = (index + 1) % tabs.length;
      else return;

      event.preventDefault();
      selectTab(next, true);
    });
  });

  tablist.hidden = false;
  selectTab(0);

  return function revealPanel(target) {
    const index = panels.findIndex((panel) => panel.contains(target) && panel.hidden);
    if (index === -1) return false;

    selectTab(index);
    return true;
  };
}

function setupFragmentNavigation(revealProject, revealPanel) {
  function revealCurrentFragment() {
    const target = document.getElementById(location.hash.slice(1));
    if (!target) return;

    if (revealProject(target) || revealPanel(target)) {
      requestAnimationFrame(() => target.scrollIntoView());
    }
  }

  window.addEventListener("hashchange", revealCurrentFragment);
  document.addEventListener("click", (event) => {
    if (!location.hash || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest("a[href^='#']");
    if (link?.hash === location.hash) revealCurrentFragment();
  });
  revealCurrentFragment();
}

const WEB3FORMS_ACCESS_KEY = "c4cf58ea-87c7-4572-b92d-30270eb6518a";

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-alert");
  const submit = document.getElementById("submit-btn");
  const submitLabel = submit.textContent;
  const whatsapp = document.getElementById("contact-link-whatsapp");

  function showWhatsAppFallback(name, email, message) {
    const fallback = whatsapp.cloneNode(false);
    fallback.removeAttribute("id");
    const url = new URL(whatsapp.href);
    url.searchParams.set("text", "Olá, Caio! Meu nome é " + name + " (" + email + "). " + message);
    fallback.href = url.href;
    fallback.textContent = "Enviar pelo WhatsApp";

    feedback.dataset.state = "error";
    feedback.replaceChildren("Não foi possível enviar a mensagem. ", fallback, ".");
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submit.disabled) return;

    const fields = new FormData(form);
    const name = fields.get("name").trim();
    const email = fields.get("email").trim();
    const message = fields.get("message").trim();

    if (!name || !email || !message) {
      feedback.dataset.state = "error";
      feedback.textContent = "Preencha todos os campos para enviar a mensagem.";
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "SUA_ACCESS_KEY_AQUI") {
      showWhatsAppFallback(name, email, message);
      return;
    }

    submit.disabled = true;
    submit.textContent = "Enviando…";
    delete feedback.dataset.state;
    feedback.textContent = "Enviando mensagem.";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name,
          email,
          message,
          from_name: name,
          subject: "Novo contato de " + name + " pelo portfólio"
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        showWhatsAppFallback(name, email, message);
        return;
      }

      form.reset();
      feedback.dataset.state = "success";
      feedback.textContent = "Mensagem enviada. Em breve entrarei em contato.";
    } catch {
      showWhatsAppFallback(name, email, message);
    } finally {
      submit.disabled = false;
      submit.textContent = submitLabel;
    }
  });

  form.hidden = false;
}

setupNavigation();
setupFragmentNavigation(setupProjectFilters(), setupEngineeringTabs());
setupContactForm();
document.getElementById("copyright-year").textContent = new Date().getFullYear();
