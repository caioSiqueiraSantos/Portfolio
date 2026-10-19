import { PortfolioAPI } from "./api.js";

// Dados reais do currículo para exibição
const DEFAULT_PROJECTS = [
  {
    id: "sistema-monitoramento-ia",
    title: "Sistema de Monitoramento e Análise com IA",
    description: "Arquitetura corporativa full stack desenvolvida com web scraping, backend assíncrono em FastAPI, integração com Gemini API para análise de relevância inteligente e interface reativa em React com Tailwind CSS.",
    tags: ["Python", "FastAPI", "React", "Gemini API", "Tailwind CSS", "SQLite"],
    githubUrl: "https://github.com/caioSiqueiraSantos",
    liveUrl: "#"
  },
  {
    id: "gameshop-grafos",
    title: "GameShop — E-Commerce & Motor de Recomendação em Grafos",
    description: "Plataforma completa de jogos digitais desenvolvida com React, Vite e Tailwind CSS, integrando modelagem matemática em Teoria dos Grafos. Implementa Busca em Largura (BFS) em profundidade 2 para sugerir amizades indiretas (amigos de amigos) e grafo bipartido com filtragem colaborativa para recomendar jogos por afinidade social. Inclui checkout interativo (PIX e Cartão de Crédito), biblioteca de jogos, avaliações comunitárias e painel administrativo.",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Teoria dos Grafos", "BFS", "E-Commerce", "Algoritmos"],
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

    const liveBtnHtml = proj.liveUrl && proj.liveUrl !== "#"
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
      ? `<a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link" itemprop="codeRepository" title="Ver código-fonte no repositório GitHub">
          <span>Ver no GitHub</span>
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </a>`
      : "";

    card.innerHTML = `
      <div class="project-header">
        <h3 class="project-title" itemprop="name">${proj.title}</h3>
        <p class="project-desc" itemprop="description">${proj.description}</p>
        <div class="project-tags">${tagsHtml}</div>
      </div>
      <div class="project-links">
        ${liveBtnHtml}
        ${githubBtnHtml}
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
      alertBox.textContent = err.message || "Erro ao conectar com a API. Verifique se o servidor Node está em execução.";
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
