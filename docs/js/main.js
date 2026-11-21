//___________________________________estoque ________________________________________
import "./components.js";
import {
  listarProdutos,
  listarCategorias,
  criarProduto,
  atualizarProduto,
  deletarProduto,
} from "./supabase.js";

function pegarValor(id) {
  return document.querySelector(id)?.value.trim() ?? "";
}

function pegarNumero(id) {
  return Number(pegarValor(id));
}

function pegarProduto() {
  return {
    nome: pegarValor("#nome"),
    codigo_p: pegarValor("#codigo_p"),
    preco_custo: pegarNumero("#preco_custo"),
    preco_venda: pegarNumero("#preco_venda"),
    qtd: pegarNumero("#qtd"),
    descricao: pegarValor("#descricao"),
  };
}

function configurarFormulario(id, funcao, mensagem) {
  const formulario = document.querySelector(id);

  if (!formulario) return;

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    try {
      await funcao();
      alert(mensagem);
      window.location.href = "estoque.html";
    } catch (erro) {
      console.log(erro);
      alert("Erro ao realizar operação.");
    }
  });
}

// listar produtos

async function carregarProdutos() {
  const tabela = document.querySelector("#lista-produtos");

  if (!tabela) return;

  try {
    const produtos = await listarProdutos();

    if (produtos.length === 0) {
      tabela.innerHTML =
        "<tr><td colspan='9'>Nenhum produto cadastrado.</td></tr>";
      return;
    }

    tabela.innerHTML = produtos
      .map(
        (produto) => `
      <tr>
        <td>${produto.id_produto ?? "-"}</td>
        <td>${produto.nome ?? "-"}</td>
        <td>${produto.codigo_p ?? "-"}</td>
        <td>${produto.id_categorias ?? "-"}</td>
        <td>R$ ${Number(produto.preco_custo ?? 0).toFixed(2)}</td>
        <td>R$ ${Number(produto.preco_venda ?? 0).toFixed(2)}</td>
        <td>${produto.qtd ?? 0}</td>
        <td>${produto.estoque_min ?? 0}</td>
        <td>${produto.data_criacao?.slice(0, 10) ?? "-"}</td>
      </tr>
    `,
      )
      .join("");
  } catch (erro) {
    console.log(erro);
    tabela.innerHTML =
      "<tr><td colspan='9'>Erro ao carregar produtos.</td></tr>";
  }
}

// carregar categorias

async function carregarCategorias() {
  const select = document.querySelector("#id_categorias");

  if (!select) return;

  try {
    const categorias = await listarCategorias();

    select.innerHTML = "<option value=''>Selecione uma categoria</option>";

    categorias.forEach((categoria) => {
      select.innerHTML += `
        <option value="${categoria.id_categorias}">
          ${categoria.id_categorias} - ${categoria.nome}
        </option>
      `;
    });
  } catch (erro) {
    console.log(erro);
  }
}

carregarProdutos();
carregarCategorias();

document
  .querySelector("#btn-read")
  ?.addEventListener("click", carregarProdutos);

// cadastrar produto

configurarFormulario(
  "#form-create",
  () => {
    return criarProduto({
      ...pegarProduto(),
      id_categorias: pegarNumero("#id_categorias"),
      estoque_min: pegarNumero("#estoque_min"),
      data_criacao: new Date().toISOString().slice(0, 10),
    });
  },
  "Produto cadastrado com sucesso!",
);

// editar produto

configurarFormulario(
  "#form-update",
  () => {
    return atualizarProduto(pegarNumero("#id"), pegarProduto());
  },
  "Produto atualizado com sucesso!",
);

// excluir produto

configurarFormulario(
  "#form-delete",
  () => {
    const id = pegarNumero("#id");

    if (!confirm("Deseja realmente excluir este produto?")) {
      throw new Error("Operação cancelada");
    }

    return deletarProduto(id);
  },
  "Produto excluído com sucesso!",
);

//__________________________________________________________________________________________________
