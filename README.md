# Portfolio Fullstack (Node.js + Vanilla Web)

Portfolio profissional fullstack projetado para máxima performance, indexação por motores de busca (SEO / Schema.org), acessibilidade (a11y), arquitetura limpa e API REST integrada para contato e consumo de dados.

## 🚀 Tecnologias

- **Frontend**: HTML5 Semântico, CSS3 Moderno (Design System customizado com variáveis CSS, responsivo, dark mode nativo), JavaScript Vanilla (ES6+ modular).
- **Backend**: Node.js, Express, CORS, Helmet, Rate Limiter para segurança da API.
- **SEO & Metadados**: Open Graph, Twitter Cards, Schema.org (JSON-LD formatado para perfil pessoal/profissional), `robots.txt`, `sitemap.xml`.
- **API REST**: Endpoints estruturados para listagem pública de projetos, dados de perfil e formulário de contato com validação.

## 📂 Estrutura do Projeto

```text
Portfolio/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Controladores das rotas
│   │   ├── routes/         # Definição das rotas REST
│   │   ├── data/           # Dados mockados/estruturados (projetos, skills)
│   │   ├── middleware/     # Validação, segurança e rate-limiting
│   │   └── app.js          # Configuração da aplicação Express
│   ├── server.js           # Ponto de entrada do servidor
│   └── package.json        # Dependências e scripts backend
├── frontend/
│   ├── css/
│   │   ├── variables.css   # Cores, tipografia, espaçamentos
│   │   ├── components.css  # Botões, cards, modal, formulário
│   │   └── main.css        # Layouts e estilos gerais
│   ├── js/
│   │   ├── api.js          # Consumo da API REST
│   │   ├── ui.js           # Interações e animações da interface
│   │   └── main.js         # Inicialização do frontend
│   ├── index.html          # Página principal altamente semântica e com JSON-LD
│   ├── robots.txt          # Regras para crawlers e robôs de busca
│   └── sitemap.xml         # Mapa de URLs do site
├── .gitignore              # Ignora node_modules, .env, etc.
└── README.md
```

## 🛠️ Como Executar Localmente

### 1. Clonar ou abrir o diretório
```bash
git clone <url-do-seu-repositorio>
cd Portfolio
```

### 2. Configurar e rodar o Backend
```bash
cd backend
npm install
npm run dev # ou npm start
```
O servidor iniciará em `http://localhost:3000`.

### 3. Executar o Frontend
Você pode abrir o arquivo `frontend/index.html` diretamente no navegador ou utilizar extensões como o **Live Server** no VSCode/Antigravity, ou servir via servidor estático local.
