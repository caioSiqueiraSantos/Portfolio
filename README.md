# Portfólio Profissional — Caio Siqueira Santos | AI Engineer & Full Stack

Portfólio técnico de **Engenharia de Inteligência Artificial (AI Engineering / GenAI)** e **Engenharia de Software Full Stack**, projetado para destacar a construção e operacionalização de soluções com **Large Language Models (LLMs / Google Gemini API)**, **Active Learning (Human-in-the-Loop)**, **Sistemas de Recomendação em Grafos**, pipelines de dados em **Python / FastAPI** e arquiteturas escaláveis.

## 🧠 Destaques em Engenharia de IA & GenAI

- **Orquestração de LLMs & Prompt Engineering**: Integração produtiva com Google Gemini API, extração de dados estruturados (JSON Schema), pré-filtragem léxica para otimização de tokens e controle de latência.
- **Active Learning (Human-in-the-Loop)**: Arquitetura de *Feedback Engine* onde reclassificações e justificativas humanas alimentam a memória contextual do modelo (*Few-Shot Dinâmico*) para calibração contínua em produção.
- **Sistemas de Recomendação & Teoria dos Grafos**: Implementação de Filtragem Colaborativa em Grafos Bipartidos (Usuário–Item) e Busca em Largura (BFS em profundidade 2) para ranqueamento de catálogo e descoberta por afinidade.
- **AI Software Engineering & Agentes**: Backends assíncronos e resilientes em **Python (FastAPI)**, orquestração de workflows e agentes automatizados com **n8n**, containerização com **Docker**, persistência em **PostgreSQL**, APIs em **.NET 8 (C#)** e dashboards analíticos em **React 19 + TypeScript**.

## 🚀 Tecnologias do Portfólio

- **Frontend**: HTML5 Semântico, CSS3 Moderno (Design System dark mode com abas interativas de Engenharia de IA e filtro de projetos), JavaScript (ES6+ modular).
- **Formulário de Contato**: Integração serverless direta via **Web3Forms**.
- **Deploy Automatizado**: GitHub Actions com pipeline de publicação contínua no **GitHub Pages**.
- **SEO & Dados Estruturados**: Open Graph, Twitter Cards, Schema.org (JSON-LD estruturado para AI Engineer), `robots.txt`, `sitemap.xml`.

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
│   │   ├── components.css  # Botões, cards, abas interativas de IA, alertas
│   │   └── main.css        # Layouts e estilos gerais
│   ├── js/
│   │   └── main.js         # Renderização reativa, abas de IA, filtros e formulário
│   ├── CNAME               # Configuração do domínio customizado
│   ├── index.html          # Interface principal focada em AI Engineering & GenAI
│   ├── robots.txt          # Regras para robôs de busca
│   └── sitemap.xml         # Mapa de URLs do site
├── .gitignore
└── README.md
```

## 🛠️ Como Executar Localmente

Você pode abrir o arquivo `frontend/index.html` diretamente no seu navegador ou utilizar um servidor estático local:

```bash
npx serve frontend
```
