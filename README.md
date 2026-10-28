# Portfolio Profissional — Caio Siqueira Santos

Portfólio moderno de Engenharia de Software e Desenvolvimento Full Stack, projetado para máxima performance, indexação por motores de busca (SEO / Schema.org), acessibilidade (a11y), arquitetura estática leve e entrega contínua via **GitHub Pages**.

## 🚀 Tecnologias e Recursos

- **Frontend**: HTML5 Semântico, CSS3 Moderno (Design System customizado com variáveis CSS, responsivo, dark mode), JavaScript Moderno (ES6+ modular).
- **Formulário de Contato**: Integração serverless direta via **Web3Forms** (disparo instantâneo para e-mail sem necessidade de infraestrutura ou servidores dedicados).
- **Deploy Automatizado**: GitHub Actions com pipeline de publicação direta no **GitHub Pages**.
- **SEO & Metadados**: Open Graph, Twitter Cards, Schema.org (JSON-LD formatado para perfil pessoal/profissional), `robots.txt`, `sitemap.xml`.

## 📂 Estrutura do Projeto

```text
Portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml      # Pipeline de deploy automático para GitHub Pages
├── frontend/
│   ├── assets/             # Imagens e mídias dos projetos
│   ├── css/                # Folhas de estilo modularizadas
│   │   ├── variables.css   # Cores, tipografia, tokens de design
│   │   ├── components.css  # Botões, cards, alertas
│   │   └── main.css        # Layouts e estilos gerais
│   ├── js/
│   │   └── main.js         # Renderização reativa e integração do formulário
│   ├── CNAME               # Configuração do domínio customizado
│   ├── index.html          # Interface principal com SEO e JSON-LD
│   ├── robots.txt          # Regras para robôs de busca
│   └── sitemap.xml         # Mapa de URLs do site
├── .gitignore
└── README.md
```

## 🛠️ Como Executar Localmente

Você pode abrir o arquivo `frontend/index.html` diretamente no seu navegador ou utilizar uma extensão como o **Live Server** (VSCode / Antigravity) ou qualquer servidor local estático:

```bash
# Exemplo com npx serve ou Live Server:
npx serve frontend
```

