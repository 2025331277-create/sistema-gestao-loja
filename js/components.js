class AppHeader extends HTMLElement {
  connectedCallback() {
    const tituloPagina =
      this.getAttribute("titulo") || "Sistema de Gestão de Loja";
    this.innerHTML = `
      <header>
        <h1>${tituloPagina}</h1>
        <div id="info-usuario">
          <span id="nome-loja"></span>
        </div>
      </header>
    `;
  }
}

class AppNav extends HTMLElement {
  connectedCallback() {
    const paginaAtual = window.location.pathname.split("/").pop();

    this.innerHTML = `
      <nav>
        <a href="inicio.html" class="${paginaAtual === "inicio.html" ? "ativo" : ""}">Início</a>
        <a href="vendas.html" class="${paginaAtual === "vendas.html" ? "ativo" : ""}">Vendas / PDV</a>
        <a href="estoque.html" class="${paginaAtual === "estoque.html" ? "ativo" : ""}">Estoque</a>
        <a href="clientes.html" class="${paginaAtual === "clientes.html" ? "ativo" : ""}">Clientes</a>
        <a href="fornecedores.html" class="${paginaAtual === "fornecedores.html" ? "ativo" : ""}">Fornecedores</a>
        <a href="financeiro.html" class="${paginaAtual === "financeiro.html" ? "ativo" : ""}">Financeiro</a>
        <a href="config.html" class="${paginaAtual === "config.html" ? "ativo" : ""}">Configurações</a>
      </nav>
    `;
  }
}
class AppFooter extends HTMLElement {
  connectedCallback() {
    const anoAtual = new Date().getFullYear();
    this.innerHTML = `
      <footer>
        <p>Sistema de Gestão de Loja v4</p>
      </footer>
    `;
  }
}

customElements.define("app-header", AppHeader);
customElements.define("app-nav", AppNav);
customElements.define("app-footer", AppFooter);
