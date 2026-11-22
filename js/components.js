class AppHeader extends HTMLElement {
  connectedCallback() {
    const titulo = this.getAttribute("titulo") || "Estoque";

    let usuario = null;
    try {
      usuario = JSON.parse(localStorage.getItem("usuario"));
    } catch (erro) {
      usuario = null;
    }

    this.innerHTML = `
      <header>
        <h1>${titulo}</h1>
        <div id="info-usuario">
          <span id="nome-usuario">${usuario?.email || ""}</span>
          <button type="button" id="botao-sair">Sair</button>
        </div>
      </header>
    `;

    const botaoSair = this.querySelector("#botao-sair");
    botaoSair?.addEventListener("click", () => {
      localStorage.removeItem("usuario");
      window.location.href = "../index.html";
    });
  }
}

class AppNav extends HTMLElement {
  connectedCallback() {
    const pagina = window.location.pathname.split("/").pop();

    this.innerHTML = `
      <nav>
        <a href="inicio.html" class="${pagina === "inicio.html" ? "ativo" : ""}">Início</a>
        <a href="vendas.html" class="${pagina === "vendas.html" ? "ativo" : ""}">Vendas / PDV</a>
        <a href="estoque.html" class="${pagina === "estoque.html" ? "ativo" : ""}">Estoque</a>
        <a href="clientes.html" class="${pagina === "clientes.html" ? "ativo" : ""}">Clientes</a>
        <a href="fornecedores.html" class="${pagina === "fornecedores.html" ? "ativo" : ""}">Fornecedores</a>
        <a href="financeiro.html" class="${pagina === "financeiro.html" ? "ativo" : ""}">Financeiro</a>
        <a href="config.html" class="${pagina === "config.html" ? "ativo" : ""}">Configurações</a>
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
