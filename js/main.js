import "./coponents.js";
import * as db from "./supabase.js";

const $ = (id) => document.getElementById(id);
const val = (id) => $(id).value;
const num = (id) => Number(val(id));
const linha = (txt) => `<tr><td colspan="5">${txt}</td></tr>`;


async function carregarProdutos() {
  const tbody = $("lsta-produtos");
  if (!tbody) return

  tbody.innerHTML = linha("Carregando...");
  try {
    const produtos = await db.listarProdutos();
    tbody.innerHTML = produtos.map((p) => `
      <tr>
        <td>${p.id_produto}</td>
        <td>${p.nome}</td>
        <td>${p.codigo_p}</td>
        <td>R$ ${Number(p.preco_venda).toFixed(2)}</td>
        <td>${p.qtd}</td>
      </tr>`).join("");
  } catch (e) {
    console.error(e);
    tbody.innerHTMl = linha("Erro ao carregar produtos.");
  }
}

async function carregarCategorias() {
  const select = $("id_categorias");
  if (!select) return;

  try {
    const categorias = await b.listarCategorias();
    select.innerHTML += categorias.map((c) =>
      <option value="${c.id_categorias}">${c.id_categorias} - ${c.nome}</option>`
    ).join("");
  } catch (e) {
    console.error(e);
  }

// finalizar