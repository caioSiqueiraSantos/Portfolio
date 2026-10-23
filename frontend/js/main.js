import { PortfolioAPI } from "./api.js";

// Dados reais do currículo para exibição
const DEFAULT_PROJECTS = [
  {
    id: "sistema-monitoramento-ia",
    title: "Sistema de Monitoramento e Análise com IA",
    category: "Full Stack & Inteligência Artificial",
    badge: "Pipeline & Analytics",
    image: "assets/img/project-monitoramento-ia.jpg",
    description: "Arquitetura corporativa full stack desenvolvida do zero com web scraping, backend assíncrono em FastAPI, integração com Gemini API para análise de relevância inteligente e interface reativa em React com Tailwind CSS.",
    highlights: [
      "Web scraping automatizado com processamento assíncrono de dados",
      "Análise semântica e classificação inteligente com Gemini API",
      "Dashboard reativo em React com métricas e telemetria operacional"
    ],
    tags: ["Python", "FastAPI", "React", "Gemini API", "Tailwind CSS", "PostgreSQL"],
    githubUrl: "https://github.com/caioSiqueiraSantos",
    liveUrl: "#"
  },
  {
    id: "gameshop-grafos",
    title: "GameShop — E-Commerce & Motor de Recomendação em Grafos",
    category: "E-Commerce & Teoria dos Grafos",
    badge: "Produção Online",
    image: "assets/img/project-gameshop.png",
    description: "Plataforma completa de jogos digitais desenvolvida com React, Vite e Tailwind CSS, integrando modelagem matemática em Teoria dos Grafos. Implementa Busca em Largura (BFS) em profundidade 2 para sugerir amizades indiretas (amigos de amigos) e grafo bipartido com filtragem colaborativa para recomendação de jogos por afinidade social. Conta com checkout interativo (PIX e Cartão de Crédito), biblioteca digital, avaliações comunitárias e painel administrativo.",
    highlights: [
      "Busca em Largura (BFS) em profundidade 2 para descobrir amigos de amigos",
      "Grafo bipartido com algoritmo de similaridade para recomendação de jogos",
      "Checkout completo com PIX Instantâneo e Cartão interativo GameShop Black"
    ],
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Teoria dos Grafos", "BFS", "E-Commerce"],
    githubUrl: "https://github.com/caioSiqueiraSantos/GameShop",
    liveUrl: "https://game-shop-rho-beryl.vercel.app/"
  }
];

function renderProjects(projects) {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = "";

  projects.forEach((proj) => {
    const card = document.createElement("article");
    card.className = "card project-card";
    card.setAttribute("itemscope", "");
    card.setAttribute("itemtype", "https://schema.org/SoftwareSourceCode");

    const tagsHtml = proj.tags
      .map(tag => `<span class="project-tag">${tag}</span>`)
      .join("");

    const isLive = proj.liveUrl && proj.liveUrl !== "#";

    const badgeHtml = proj.badge
      ? `<span class="project-badge ${isLive ? 'badge-live' : 'badge-default'}">
          ${isLive ? '<span class="status-dot"></span>' : ''}
          ${proj.badge}
        </span>`
      : "";

    const highlightsHtml = proj.highlights && proj.highlights.length > 0
      ? `<ul class="project-highlights">
          ${proj.highlights.map(item => `
            <li class="project-highlight-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>${item}</span>
            </li>
          `).join("")}
        </ul>`
      : "";

    const liveBtnHtml = isLive
      ? `<a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link project-link-primary" itemprop="url" title="Acessar aplicação online em produção">
          <span>Acessar Projeto</span>
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>`
      : "";

    const githubBtnHtml = proj.githubUrl && proj.githubUrl !== "#"
      ? `<a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link project-link-secondary" itemprop="codeRepository" title="Ver código-fonte no repositório GitHub">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>Repositório</span>
        </a>`
      : "";

    card.innerHTML = `
      <div class="project-media">
        <img src="${proj.image}" alt="Preview do projeto ${proj.title}" class="project-img" loading="lazy" onerror="this.style.display='none'">
        <div class="project-overlay"></div>
        <div class="project-badges">
          ${badgeHtml}
        </div>
      </div>
      <div class="project-content">
        <div class="project-meta-header">
          <span class="project-category">${proj.category || 'Engenharia de Software'}</span>
        </div>
        <h3 class="project-title" itemprop="name">${proj.title}</h3>
        <p class="project-desc" itemprop="description">${proj.description}</p>
        
        ${highlightsHtml}

        <div class="project-tags">${tagsHtml}</div>
        
        <div class="project-links">
          ${liveBtnHtml}
          ${githubBtnHtml}
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

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

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";
    alertBox.style.display = "none";
    alertBox.className = "alert-box";

    try {
      const response = await PortfolioAPI.submitContact({ name, email, message });
      alertBox.textContent = response.message || "Mensagem enviada com sucesso!";
      alertBox.classList.add("alert-success");
      alertBox.style.display = "block";
      form.reset();
    } catch (err) {
      const encodedMsg = encodeURIComponent(`Olá, Caio! Meu nome é ${name} (${email}). ${message}`);
      alertBox.innerHTML = `Não foi possível enviar via e-mail no momento. <a href="https://wa.me/5511966935424?text=${encodedMsg}" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; text-decoration: underline; font-weight: 600; display: inline-block; margin-top: 0.5rem;">👉 Clique aqui para me enviar via WhatsApp</a>`;
      alertBox.classList.add("alert-error");
      alertBox.style.display = "block";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar Mensagem";
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  setupContactForm();

  const projects = await PortfolioAPI.getProjects();
  if (projects && projects.length > 0) {
    renderProjects(projects);
  } else {
    renderProjects(DEFAULT_PROJECTS);
  }
});
