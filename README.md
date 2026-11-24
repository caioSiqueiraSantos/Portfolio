# Portfólio profissional de Caio Siqueira Santos

Engenharia de Software & Tecnologia. O portfólio reúne a trajetória no Núcleo de Inovação e Tecnologia do Metrô de São Paulo e estudos de caso sobre arquitetura, integração, automação, inteligência artificial aplicada e grafos.

## Estrutura

- `frontend/index.html` contém o conteúdo semântico e os metadados de compartilhamento e busca.
- `frontend/css/variables.css` reúne tokens de design. `main.css` define a composição das seções e `components.css` concentra estilos de navegação, projetos, abas e formulário.
- `frontend/js/main.js` inicializa o menu móvel, os filtros, as abas e o formulário integrado ao Web3Forms.
- `frontend/assets/img/` contém a fotografia, os ícones e as capturas das aplicações.

## Execução local

Abra `frontend/index.html` no navegador ou sirva a pasta por HTTP com Python.

```sh
python -m http.server 8000 --directory frontend
```

O GitHub Actions publica o diretório `frontend/` como artefato estático no GitHub Pages quando o fluxo de publicação é acionado.
