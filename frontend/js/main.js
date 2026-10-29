// ============================================================
// Portfólio Caio Siqueira Santos — AI Engineer & Full Stack
// ============================================================

// Filtro de Projetos (Global para funcionar com onclick e addEventListener)
window.filterProjects = function (filter) {
  const filterBtns = document.querySelectorAll(".project-filter-btn");
  filterBtns.forEach((btn) => {
    const btnFilter = btn.getAttribute("data-filter");
    if (btnFilter === filter) {
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
    } else {
      btn.classList.remove("active");
      btn.setAttribute("aria-selected", "false");
    }
  });

  const track = document.getElementById("projects-container");
  if (!track) return;

  const allCards = track.querySelectorAll(".project-card");
  const visibleCards = [];

  allCards.forEach((card) => {
    const group = card.getAttribute("data-group") || "ai";
    const matches = filter === "all" || group === filter;

    if (matches) {
      card.classList.remove("is-hidden");
      card.style.display = "";
      visibleCards.push(card);
    } else {
      card.classList.add("is-hidden");
      card.style.display = "none";
    }
  });

  // Atualiza contador numérico no cabeçalho
  const countEl = document.querySelector(".projects-count-number");
  if (countEl) {
    countEl.textContent = String(visibleCards.length).padStart(2, "0");
  }

  // Reseta rolagem horizontal para o início
  track.scrollLeft = 0;

  // Atualiza indicadores (dots) do carrossel para os cards visíveis
  updateCarouselDots(visibleCards);
};

// Alternância de Abas na Seção de Engenharia de IA (Global)
window.switchAITab = function (tabId) {
  const tabBtns = document.querySelectorAll(".ai-tab-btn");
  const tabPanels = document.querySelectorAll(".ai-tab-panel");

  tabBtns.forEach((b) => {
    const isTarget = b.getAttribute("data-tab") === tabId;
    b.classList.toggle("active", isTarget);
    b.setAttribute("aria-selected", isTarget ? "true" : "false");
  });

  tabPanels.forEach((p) => {
    p.classList.toggle("active", p.id === tabId);
  });
};

function setupAITabs() {
  const tabBtns = document.querySelectorAll(".ai-tab-btn");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");
      if (targetId) {
        window.switchAITab(targetId);
      }
    });
  });
}

function setupProjectFilters() {
  const filterBtns = document.querySelectorAll(".project-filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      if (filter) {
        window.filterProjects(filter);
      }
    });
  });
}

function updateCarouselDots(visibleCards) {
  const track = document.getElementById("projects-container");
  const dotsContainer = document.getElementById("carousel-dots");
  const edgeFade = document.getElementById("carousel-edge-fade");

  if (!track || !dotsContainer) return;

  dotsContainer.innerHTML = "";
  const total = visibleCards.length;

  for (let i = 0; i < total; i++) {
    const dot = document.createElement("button");
    dot.className = `carousel-dot ${i === 0 ? "active" : ""}`;
    dot.setAttribute("type", "button");
    dot.setAttribute("aria-label", `Ir para o projeto ${i + 1}`);
    dot.addEventListener("click", () => {
      if (visibleCards[i]) {
        visibleCards[i].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      }
    });
    dotsContainer.appendChild(dot);
  }

  if (edgeFade) {
    const maxScroll = track.scrollWidth - track.clientWidth;
    edgeFade.style.opacity = maxScroll <= 8 ? "0" : "1";
  }
}

let carouselEventsAttached = false;

function initProjectsCarousel() {
  const track = document.getElementById("projects-container");
  const dotsContainer = document.getElementById("carousel-dots");
  const edgeFade = document.getElementById("carousel-edge-fade");

  if (!track) return;

  const visibleCards = Array.from(track.querySelectorAll(".project-card:not(.is-hidden)"));
  updateCarouselDots(visibleCards);

  function getCardWidth() {
    const card = track.querySelector(".project-card:not(.is-hidden)");
    if (!card) return 400;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || 24;
    return card.offsetWidth + gap;
  }

  function updateControls() {
    const scrollLeft = track.scrollLeft;
    const maxScroll = track.scrollWidth - track.clientWidth;

    if (edgeFade) {
      edgeFade.style.opacity = maxScroll <= 8 || scrollLeft >= maxScroll - 16 ? "0" : "1";
    }

    const currentCards = track.querySelectorAll(".project-card:not(.is-hidden)");
    if (!currentCards.length) return;

    const cardWidth = getCardWidth();
    const activeIndex = Math.min(
      Math.max(0, currentCards.length - 1),
      Math.max(0, Math.round(scrollLeft / cardWidth))
    );

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll(".carousel-dot");
      dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === activeIndex);
      });
    }
  }

  if (!carouselEventsAttached) {
    carouselEventsAttached = true;

    track.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const maxScroll = track.scrollWidth - track.clientWidth;
        if ((e.deltaY > 0 && track.scrollLeft < maxScroll) || (e.deltaY < 0 && track.scrollLeft > 0)) {
          e.preventDefault();
          track.scrollLeft += e.deltaY;
        }
      }
    }, { passive: false });

    let isDown = false;
    let startX = 0;
    let scrollLeftStart = 0;

    track.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeftStart = track.scrollLeft;
    });

    window.addEventListener("mouseup", () => {
      isDown = false;
    });

    track.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeftStart - walk;
    });

    track.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);
  }

  setTimeout(updateControls, 100);
}

// Chave de acesso do Web3Forms vinculada a caio.siqueira.dev@gmail.com
const WEB3FORMS_ACCESS_KEY = "c4cf58ea-87c7-4572-b92d-30270eb6518a";

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const alertBox = document.getElementById("form-alert");
  const submitBtn = document.getElementById("submit-btn");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alertBox.textContent = "Por favor, preencha todos os campos do formulário.";
      alertBox.className = "alert-box alert-error";
      alertBox.style.display = "block";
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "SUA_ACCESS_KEY_AQUI") {
      const encodedMsg = encodeURIComponent(`Olá, Caio! Meu nome é ${name} (${email}). ${message}`);
      alertBox.innerHTML = `Configure sua chave do Web3Forms em <code>js/main.js</code> ou fale diretamente: <a href="https://wa.me/5511966935424?text=${encodedMsg}" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; text-decoration: underline; font-weight: 600; display: inline-block; margin-top: 0.5rem;">👉 Clique aqui para me enviar via WhatsApp</a>`;
      alertBox.className = "alert-box alert-error";
      alertBox.style.display = "block";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";
    alertBox.style.display = "none";
    alertBox.className = "alert-box";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: name,
          email: email,
          message: message,
          from_name: name,
          subject: `🔔 Novo contato de ${name} pelo Portfólio (AI Engineer)`
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alertBox.textContent = "Mensagem enviada com sucesso! Em breve entrarei em contato.";
        alertBox.className = "alert-box alert-success";
        alertBox.style.display = "block";
        form.reset();
      } else {
        throw new Error(data.message || "Erro ao despachar formulário");
      }
    } catch (err) {
      console.warn("Envio de formulário indisponível:", err);
      const encodedMsg = encodeURIComponent(`Olá, Caio! Meu nome é ${name} (${email}). ${message}`);
      alertBox.innerHTML = `Não foi possível enviar via e-mail no momento. <a href="https://wa.me/5511966935424?text=${encodedMsg}" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; text-decoration: underline; font-weight: 600; display: inline-block; margin-top: 0.5rem;">👉 Clique aqui para me enviar via WhatsApp</a>`;
      alertBox.className = "alert-box alert-error";
      alertBox.style.display = "block";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar Mensagem";
    }
  });
}

function init() {
  setupContactForm();
  setupAITabs();
  setupProjectFilters();
  initProjectsCarousel();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
