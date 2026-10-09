import { PortfolioAPI } from "./api.js";

// Dados reais do currículo para exibição
const DEFAULT_PROJECTS = [
  {
    id: "sistema-monitoramento-ia",
    title: "Sistema de Monitoramento e Análise com IA",
    description: "Arquitetura corporativa desenvolvida de forma autônoma com web scraping e backend em FastAPI, integrando a Gemini API para análise de relevância inteligente e interface em React com Tailwind CSS.",
    tags: ["Python", "FastAPI", "React", "Gemini API", "Tailwind CSS", "SQLite"],
    githubUrl: "https://github.com/caioSiqueiraSantos",
    liveUrl: "#"
  },
  {
    id: "loja-virtual-grafos",
    title: "Loja Virtual com Motor de Recomendação",
    description: "Aplicação web desenvolvida com React e lógica de grafos em JavaScript para calcular similaridade e recomendar jogos em tempo real com base na rede de preferências dos usuários.",
    tags: ["React", "JavaScript", "Algoritmos em Grafos", "LocalStorage"],
    githubUrl: "https://github.com/caioSiqueiraSantos",
    liveUrl: "#"
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

    card.innerHTML = `
      <div class="project-header">
        <h3 class="project-title" itemprop="name">${proj.title}</h3>
        <p class="project-desc" itemprop="description">${proj.description}</p>
        <div class="project-tags">${tagsHtml}</div>
      </div>
      <div class="project-links">
        <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link" itemprop="codeRepository">
          Ver no GitHub &rarr;
        </a>
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
