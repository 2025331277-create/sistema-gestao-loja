const SUPABASE_URL = "https://iqjsahuamgzskbktupci.supabase.co";
const SUPABASE_KEY = "sb_publishable_ScRr0vEWNUa6861mQg8lsg_wsj_FRxv";

const headers = {
  apikey: SUPABASE_KEY,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

function endpoint(tabela) {
  return `${SUPABASE_URL}/rest/v1/${tabela}`;
}

export async function listar(tabela, ordem = "") {
  const url = `${endpoint(tabela)}?select=*${ordem ? `&order=${ordem}` : ""}`;
  const resposta = await fetch(url, { method: "GET", headers });
  if (!resposta.ok) throw new Error(`Erro ao listar ${tabela}`);
  return await resposta.json();
}

export async function buscarPorId(tabela, campoId, id) {
  const resposta = await fetch(
    `${endpoint(tabela)}?${campoId}=eq.${id}&select=*`,
    {
      method: "GET",
      headers,
    },
  );
  if (!resposta.ok) throw new Error(`Erro ao buscar ${tabela}`);
  const dados = await resposta.json();
  return dados[0] || null;
}

export async function criar(tabela, dados) {
  const resposta = await fetch(endpoint(tabela), {
    method: "POST",
    headers,
    body: JSON.stringify(dados),
  });
  if (!resposta.ok) throw new Error(`Erro ao cadastrar ${tabela}`);
  return await resposta.json();
}

export async function atualizar(tabela, campoId, id, dados) {
  const resposta = await fetch(`${endpoint(tabela)}?${campoId}=eq.${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(dados),
  });
  if (!resposta.ok) throw new Error(`Erro ao atualizar ${tabela}`);
  return await resposta.json();
}

export async function excluir(tabela, campoId, id) {
  const resposta = await fetch(`${endpoint(tabela)}?${campoId}=eq.${id}`, {
    method: "DELETE",
    headers,
  });
  if (!resposta.ok) throw new Error(`Erro ao excluir ${tabela}`);
}

export async function listarProdutos() {
  return await listar("produtos", "id_produto.asc");
}

export async function listarCategorias() {
  return await listar("categorias", "id_categorias.asc");
}

export async function criarProduto(produto) {
  return await criar("produtos", produto);
}

export async function atualizarProduto(id, produto) {
  return await atualizar("produtos", "id_produto", id, produto);
}

export async function deletarProduto(id) {
  return await excluir("produtos", "id_produto", id);
}

export async function listarLoja(id) {
  return await buscarPorId("loja", "id_loja", id);
}

export async function atualizarLoja(id, dados) {
  return await atualizar("loja", "id_loja", id, dados);
}
