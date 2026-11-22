//________________________ SISTEMA DA LOJA ________________________

import "./components.js";

import {
  listarProdutos,
  listarCategorias,
  criarProduto,
  atualizarProduto,
  deletarProduto,
} from "./supabase.js";

//________________________ VARIAVEIS ______________________________

let produtos = [];
let categorias = [];

let nome = "";
let codigo = "";
let descricao = "";
let categoria = 0;
let preco_custo = 0;
let preco_venda = 0;
let quantidade = 0;
let estoque_minimo = 0;

//________________________ FUNCOES BASICAS ________________________

function pegarTexto(id) {
  let campo = document.querySelector(id);

  if (campo) {
    return campo.value.trim();
  }

  return "";
}

function pegarNumero(id) {
  return Number(pegarTexto(id));
}

function mostrarData(data) {
  if (!data) return "-";

  let partes = data.slice(0, 10).split("-");
  if (partes.length !== 3) return data;

  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

//________________________ CONSULTA DE PRODUTOS ___________________

async function carregarProdutos() {
  let tabela = document.querySelector("#lista-produtos");
  if (!tabela) return;

  try {
    produtos = await listarProdutos();
    tabela.innerHTML = "";

    if (produtos.length === 0) {
      tabela.innerHTML =
        '<tr><td colspan="9">Nenhum produto cadastrado.</td></tr>';
      return;
    }

    for (let i = 0; i < produtos.length; i++) {
      let produto = produtos[i];

      tabela.innerHTML += `
        <tr>
          <td>${produto.id_produto}</td>
          <td>${produto.nome}</td>
          <td>${produto.codigo_p}</td>
          <td>${produto.id_categorias}</td>
          <td>R$ ${Number(produto.preco_custo).toFixed(2)}</td>
          <td>R$ ${Number(produto.preco_venda).toFixed(2)}</td>
          <td>${produto.qtd}</td>
          <td>${produto.estoque_min}</td>
          <td>${mostrarData(produto.data_criacao)}</td>
        </tr>
      `;
    }
  } catch (erro) {
    console.log(erro);
    alert("Erro ao consultar os produtos.");
  }
}

//________________________ CONSULTA DE CATEGORIAS _________________

async function carregarCategorias() {
  let lista = document.querySelector("#id_categorias");
  if (!lista) return;

  try {
    categorias = await listarCategorias();
    lista.innerHTML = '<option value="">Selecione uma categoria</option>';

    for (let i = 0; i < categorias.length; i++) {
      let item = categorias[i];
      lista.innerHTML += `
        <option value="${item.id_categorias}">
          ${item.nome}
        </option>
      `;
    }
  } catch (erro) {
    console.log(erro);
  }
}

//________________________ CADASTRO DE PRODUTO ____________________

let formularioCriar = document.querySelector("#form-create");

if (formularioCriar) {
  formularioCriar.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    nome = pegarTexto("#nome");
    codigo = pegarTexto("#codigo_p");
    descricao = pegarTexto("#descricao");
    categoria = pegarNumero("#id_categorias");
    preco_custo = pegarNumero("#preco_custo");
    preco_venda = pegarNumero("#preco_venda");
    quantidade = pegarNumero("#qtd");
    estoque_minimo = pegarNumero("#estoque_min");

    try {
      await criarProduto({
        nome: nome,
        codigo_p: codigo,
        descricao: descricao || null,
        id_categorias: categoria,
        preco_custo: preco_custo,
        preco_venda: preco_venda,
        qtd: quantidade,
        estoque_min: estoque_minimo,
        data_criacao: new Date().toISOString().slice(0, 10),
      });

      alert("Produto cadastrado com sucesso!");
      window.location.href = "estoque.html";
    } catch (erro) {
      console.log(erro);
      alert("Erro ao cadastrar o produto.");
    }
  });
}

//________________________ EDITAR PRODUTO _________________________

let formularioEditar = document.querySelector("#form-update");

if (formularioEditar) {
  formularioEditar.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    try {
      await atualizarProduto(pegarNumero("#id"), {
        nome: pegarTexto("#nome"),
        codigo_p: pegarTexto("#codigo_p"),
        preco_custo: pegarNumero("#preco_custo"),
        preco_venda: pegarNumero("#preco_venda"),
        qtd: pegarNumero("#qtd"),
      });

      alert("Produto atualizado com sucesso!");
      window.location.href = "estoque.html";
    } catch (erro) {
      console.log(erro);
      alert("Erro ao atualizar o produto.");
    }
  });
}

//________________________ EXCLUIR PRODUTO ________________________

let formularioExcluir = document.querySelector("#form-delete");

if (formularioExcluir) {
  formularioExcluir.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    let confirma = confirm("Deseja realmente excluir este produto?");
    if (!confirma) return;

    try {
      await deletarProduto(pegarNumero("#id"));
      alert("Produto excluído com sucesso!");
      window.location.href = "estoque.html";
    } catch (erro) {
      console.log(erro);
      alert("Erro ao excluir o produto.");
    }
  });
}

//________________________ INICIALIZACAO __________________________

carregarProdutos();
carregarCategorias();

let botaoConsultar = document.querySelector("#btn-read");
if (botaoConsultar) {
  botaoConsultar.addEventListener("click", carregarProdutos);
}
