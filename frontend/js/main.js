import { PortfolioAPI } from "./api.js";

// Dados estáticos de fallback caso a API ainda não tenha sido iniciada
const DEFAULT_PROJECTS = [
  {
    id: "api-gateway-service",
    title: "Microservices API Gateway",
    description: "Gateway resiliente construído em Node.js com controle de tráfego, cache e autenticação centralizada JWT.",
    tags: ["Node.js", "Express", "REST API", "Microserviços"],
    githubUrl: "https://github.com",
    liveUrl: "#"
  },
  {
    id: "high-perf-ecommerce",
    title: "Plataforma Web Otimizada",
    description: "Frontend com carregamento ultrarrápido, SEO técnico refinado, Schema.org integrado e acessibilidade plena.",
    tags: ["JavaScript Vanilla", "HTML5", "CSS Grid & Flexbox", "SEO"],
    githubUrl: "https://github.com",
    liveUrl: "#"
  },
  {
    id: "realtime-chat-dashboard",
    title: "Dashboard de Métricas & Telemetria",
    description: "Painel de controle com visualização em tempo real de requisições de API, latência e estatísticas do sistema.",
    tags: ["Node.js", "REST", "Dashboard", "Acessibilidade"],
    githubUrl: "https://github.com",
    liveUrl: "#"
  }
];

// Renderizar projetos
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
      .map(tag => `<span class="tag">${tag}</span>`)
      .join("");

    card.innerHTML = `
      <div class="project-header">
        <h3 class="project-title" itemprop="name">${proj.title}</h3>
        <p class="project-desc" itemprop="description">${proj.description}</p>
        <div class="project-tags">${tagsHtml}</div>
      </div>
      <div class="project-links">
        <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link" itemprop="codeRepository">
          GitHub &rarr;
        </a>
        ${proj.liveUrl && proj.liveUrl !== "#" ? `<a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link">Ver Demo &rarr;</a>` : ""}
      </div>
    `;

    container.appendChild(card);
  });
}

// Configurar o envio do formulário de contato
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

    // Feedback visual de carregamento
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando mensagem...";
    alertBox.style.display = "none";
    alertBox.className = "alert-box";

    try {
      const response = await PortfolioAPI.submitContact({ name, email, message });
      
      alertBox.textContent = response.message || "Mensagem enviada com sucesso!";
      alertBox.classList.add("alert-success");
      alertBox.style.display = "block";
      form.reset();
    } catch (err) {
      alertBox.textContent = err.message || "Não foi possível enviar a mensagem. Verifique se o backend está ligado.";
      alertBox.classList.add("alert-error");
      alertBox.style.display = "block";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar Mensagem";
    }
  });
}

// Inicialização principal
document.addEventListener("DOMContentLoaded", async () => {
  setupContactForm();

  // Tenta carregar os projetos da API; se falhar ou estiver offline, usa os dados estáticos
  const projects = await PortfolioAPI.getProjects();
  if (projects && projects.length > 0) {
    renderProjects(projects);
  } else {
    renderProjects(DEFAULT_PROJECTS);
  }
});
