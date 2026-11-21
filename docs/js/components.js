class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <header>
                <h1>Sistema de Gestão de Loja - Estoque</h1>
            </header>
        `;
  }
}

class AppNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <nav>
                <a href="inicio.html">Início</a>
                <a href="estoque.html">Estoque</a>
                <a href="financeiro.html">Financeiro</a>
                <a href="clientes.html">Clientes</a>
                <a href="fornecedores.html">Fornecedores</a>
                <a href="config.html">Configurações</a>
            </nav>
        `;
  }
}

class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <footer>
                <p>Sistema de Gestão de Loja</p>
            </footer>
        `;
  }
}
customElements.define("app-header", AppHeader);
customElements.define("app-nav", AppNav);
customElements.define("app-footer", AppFooter);
