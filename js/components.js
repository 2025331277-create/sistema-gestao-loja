const criarComponente = (tag, html) => {
  customElements.define(tag, class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = html;
    }
  });
};

criarComponente('app-header', `
  <header>
    <h1>Sistema de Gestão de Loja - Estoque</h1>
  </header>
`);

criarComponente('app-nav', `
  <nav>
    <a href="inicio.html">Início</a>
    <a href="estoque.html">Estoque</a>
    <a href="financeiro.html">Financeiro</a>
    <a href="clientes.html">Clientes</a>
    <a href="fornecedores.html">Fornecedores</a>
    <a href="config.html">Configurações</a>
  </nav>
`);

criarComponente('app-footer', `
  <footer>
    <p>Sistema de Gestão de Loja</p>
  </footer>
`);