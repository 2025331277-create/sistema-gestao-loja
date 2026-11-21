const SUPABASE_URL = 'https://iqjsahuamgzskbktupci.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ScRr0vEWNUa6861mQg8lsg_wsj_FRxv';

const ENDPOINT_PRODUTOS = `${SUPABASE_URL}/rest/v1/produtos`;
const ENDPOINT_CATEGORIAS = `${SUPABASE_URL}/rest/v1/categorias`;

const headers = {
    'apikey': SUPABASE_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
};

// ------------------------------------------------------------  consulta greal
export async function listarProdutos() {
    const response = await fetch(`${ENDPOINT_PRODUTOS}?select=*&order=id_produto.asc`, {
        method: 'GET',
        headers
    });
    if (!response.ok) throw new Error('Erro ao consultar produtos');
    return await response.json();
}

// ------------------------------------------------------------  cosulta cat.
export async function listarCategorias() {
    const response = await fetch(`${ENDPOINT_CATEGORIAS}?select=*&order=id_categorias.asc`, {
        method: 'GET',
        headers
    });
    if (!response.ok) throw new Error('Erro ao consultar categorias');
    return await response.json();
}

//--------------------------------------------------------------  adicionar
export async function criarProduto(produto) {
    const response = await fetch(ENDPOINT_PRODUTOS, {
        method: 'POST',
        headers,
        body: JSON.stringify(produto)
    });
    if (!response.ok) throw new Error('Erro ao cadastrar produto');
    return await response.json();
}

// ------------------------------------------------------------  editar
export async function atualizarProduto(id, produto) {
    const response = await fetch(`${ENDPOINT_PRODUTOS}?id_produto=eq.${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(produto)
    });
    if (!response.ok) throw new Error('Erro ao atualizar produto');
    return await response.json();
}

// ------------------------------------------------------------  delete
export async function deletarProduto(id) {
    const response = await fetch(`${ENDPOINT_PRODUTOS}?id_produto=eq.${id}`, {
        method: 'DELETE',
        headers
    });
    if (!response.ok) throw new Error('Erro ao excluir produto');
}
//_____________________________________________________________________________________________