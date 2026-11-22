//________________________ SISTEMA DA LOJA ________________________

import "./components.js";

import {
  listar,
  criar,
  atualizar,
  excluir,
  listarProdutos,
  listarCategorias,
  criarProduto,
  atualizarProduto,
  deletarProduto,
  listarLoja,
  atualizarLoja,
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

function formatoReal(valor) {
  return `R$ ${Number(valor || 0)
    .toFixed(2)
    .replace(".", ",")}`;
}

function gerarSku() {
  let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let sku = "";

  for (let i = 0; i < 6; i++) {
    const posicao = Math.floor(Math.random() * caracteres.length);
    sku += caracteres[posicao];
  }

  return sku;
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
    categorias = await listarCategorias();
    tabela.innerHTML = "";

    if (produtos.length === 0) {
      tabela.innerHTML =
        '<tr><td colspan="8">Nenhum produto cadastrado.</td></tr>';
      return;
    }

    for (let i = 0; i < produtos.length; i++) {
      let produto = produtos[i];
      let nomeCategoria = "Sem categoria";

      for (let j = 0; j < categorias.length; j++) {
        if (categorias[j].id_categorias === produto.id_categorias) {
          nomeCategoria = categorias[j].nome;
          break;
        }
      }

      tabela.innerHTML += `
        <tr>
          <td>${produto.nome}</td>
          <td>${produto.codigo_p}</td>
          <td>${nomeCategoria}</td>
          <td>R$ ${Number(produto.preco_custo).toFixed(2)}</td>
          <td>R$ ${Number(produto.preco_venda).toFixed(2)}</td>
          <td>${produto.qtd}</td>
          <td>${produto.estoque_min}</td>
          <td>${mostrarData(produto.data_criacao)}</td>
        </tr>
      `;
    }

    let busca = document.querySelector("#busca-produtos");
    if (busca) {
      busca.oninput = function () {
        let texto = busca.value.toLowerCase();
        let linhas = tabela.querySelectorAll("tr");

        for (let i = 0; i < linhas.length; i++) {
          let conteudo = linhas[i].textContent.toLowerCase();
          linhas[i].style.display = conteudo.includes(texto) ? "" : "none";
        }
      };
    }
  } catch (erro) {
    console.log(erro);
    tabela.innerHTML =
      '<tr><td colspan="8">Erro ao consultar os produtos.</td></tr>';
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
        codigo_p: pegarTexto("#codigo_p") || gerarSku(),
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
        descricao: pegarTexto("#descricao") || null,
        id_categorias: pegarNumero("#id_categorias") || null,
        preco_custo: pegarNumero("#preco_custo"),
        preco_venda: pegarNumero("#preco_venda"),
        qtd: pegarNumero("#qtd"),
        estoque_min: pegarNumero("#estoque_min"),
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

//________________________ CATEGORIAS _____________________________

async function carregarListaCategorias() {
  const tabela = document.querySelector("#lista-categorias");
  if (!tabela) return;

  const categorias = await listar("categorias", "id_categorias.asc");
  tabela.innerHTML = "";

  for (const categoria of categorias) {
    tabela.innerHTML += `
      <tr>
        <td>${categoria.nome}</td>
        <td>${categoria.descricao || "-"}</td>
        <td>
          <button type="button" data-editar-categoria="${categoria.id_categorias}">Editar</button>
          <button type="button" data-excluir-categoria="${categoria.id_categorias}">Excluir</button>
        </td>
      </tr>
    `;
  }

  document.querySelectorAll("[data-excluir-categoria]").forEach((botao) => {
    botao.addEventListener("click", async () => {
      if (!confirm("Deseja excluir esta categoria?")) return;
      await excluir(
        "categorias",
        "id_categorias",
        botao.dataset.excluirCategoria,
      );
      carregarListaCategorias();
    });
  });

  document.querySelectorAll("[data-editar-categoria]").forEach((botao) => {
    botao.addEventListener("click", async () => {
      const novoNome = prompt("Novo nome da categoria:");
      if (!novoNome) return;

      await atualizar(
        "categorias",
        "id_categorias",
        botao.dataset.editarCategoria,
        {
          nome: novoNome,
        },
      );

      carregarListaCategorias();
    });
  });
}

const formularioCategoria = document.querySelector("#form-categoria");
if (formularioCategoria) {
  formularioCategoria.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    try {
      const estoques = await listar("estoque");
      if (estoques.length === 0) throw new Error("Nenhum estoque cadastrado");

      await criar("categorias", {
        id_estoque: estoques[0].id_estoque,
        nome: pegarTexto("#nome-categoria"),
        descricao: pegarTexto("#descricao-categoria") || null,
      });

      formularioCategoria.reset();
      carregarListaCategorias();
      carregarCategorias();
      alert("Categoria cadastrada com sucesso!");
    } catch (erro) {
      console.log(erro);
      alert("Erro ao cadastrar categoria.");
    }
  });
}

//________________________ CLIENTES _______________________________

async function carregarClientes() {
  const tabela = document.querySelector("#lista-clientes");
  if (!tabela) return;

  const clientes = await listar("clientes", "id_cliente.asc");
  tabela.innerHTML = "";

  for (const cliente of clientes) {
    tabela.innerHTML += `
      <tr>
        <td>${cliente.nome}</td>
        <td>${cliente.cpf}</td>
        <td>${cliente.telefone || "-"}</td>
        <td>${cliente.email || "-"}</td>
        <td>${mostrarData(cliente.data_cadastro)}</td>
        <td>
          <button type="button" data-excluir-cliente="${cliente.id_cliente}">Excluir</button>
        </td>
      </tr>
    `;
  }

  document.querySelectorAll("[data-excluir-cliente]").forEach((botao) => {
    botao.addEventListener("click", async () => {
      if (!confirm("Deseja excluir este cliente?")) return;
      await excluir("clientes", "id_cliente", botao.dataset.excluirCliente);
      carregarClientes();
    });
  });

  const busca = document.querySelector("#busca-clientes");
  if (busca) {
    busca.addEventListener("input", () => {
      const texto = busca.value.toLowerCase();
      const linhas = tabela.querySelectorAll("tr");

      linhas.forEach((linha) => {
        linha.style.display = linha.textContent.toLowerCase().includes(texto)
          ? ""
          : "none";
      });
    });
  }
}

const formularioCliente = document.querySelector("#form-cliente");
if (formularioCliente) {
  formularioCliente.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    try {
      await criar("clientes", {
        id_loja: 1,
        nome: pegarTexto("#nome"),
        cpf: pegarTexto("#cpf"),
        telefone: pegarTexto("#telefone") || null,
        email: pegarTexto("#email") || null,
        data_cadastro: new Date().toISOString(),
      });

      formularioCliente.reset();
      carregarClientes();
      alert("Cliente cadastrado com sucesso!");
    } catch (erro) {
      console.log(erro);
      alert("Erro ao cadastrar cliente.");
    }
  });
}

//________________________ FORNECEDORES ___________________________

async function carregarFornecedores() {
  const tabela = document.querySelector("#lista-fornecedores");
  if (!tabela) return;

  const fornecedores = await listar("fornecedores", "id_fornecedor.asc");
  tabela.innerHTML = "";

  for (const fornecedor of fornecedores) {
    tabela.innerHTML += `
      <tr>
        <td>${fornecedor.nome}</td>
        <td>${fornecedor.cnpj || "-"}</td>
        <td>${fornecedor.telefone || "-"}</td>
        <td>${fornecedor.email || "-"}</td>
        <td><button type="button" data-excluir-fornecedor="${fornecedor.id_fornecedor}">Excluir</button></td>
      </tr>
    `;
  }

  document.querySelectorAll("[data-excluir-fornecedor]").forEach((botao) => {
    botao.addEventListener("click", async () => {
      if (!confirm("Deseja excluir este fornecedor?")) return;
      await excluir(
        "fornecedores",
        "id_fornecedor",
        botao.dataset.excluirFornecedor,
      );
      carregarFornecedores();
    });
  });
}

const formularioFornecedor = document.querySelector("#form-fornecedor");
if (formularioFornecedor) {
  formularioFornecedor.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    try {
      await criar("fornecedores", {
        id_loja: 1,
        nome: pegarTexto("#nome"),
        cnpj: pegarTexto("#cnpj") || null,
        telefone: pegarTexto("#telefone") || null,
        email: pegarTexto("#email") || null,
        endereco: pegarTexto("#endereco") || null,
        data_cadastro: new Date().toISOString(),
      });

      formularioFornecedor.reset();
      carregarFornecedores();
      alert("Fornecedor cadastrado com sucesso!");
    } catch (erro) {
      console.log(erro);
      alert("Erro ao cadastrar fornecedor.");
    }
  });
}

async function carregarVinculos() {
  const tabela = document.querySelector("#lista-fornecedor-produto");
  if (!tabela) return;

  const vinculos = await listar("fornecedores_produtos");
  const fornecedores = await listar("fornecedores");
  const produtos = await listarProdutos();
  tabela.innerHTML = "";

  for (const vinculo of vinculos) {
    let nomeFornecedor = vinculo.id_fornecedor;
    let nomeProduto = vinculo.id_produto;

    for (const fornecedor of fornecedores) {
      if (fornecedor.id_fornecedor === vinculo.id_fornecedor)
        nomeFornecedor = fornecedor.nome;
    }

    for (const produto of produtos) {
      if (produto.id_produto === vinculo.id_produto) nomeProduto = produto.nome;
    }

    tabela.innerHTML += `
      <tr>
        <td>${nomeFornecedor}</td>
        <td>${nomeProduto}</td>
        <td><button type="button" data-fornecedor="${vinculo.id_fornecedor}" data-produto="${vinculo.id_produto}">Excluir</button></td>
      </tr>
    `;
  }
}

async function preencherFornecedoresProdutos() {
  const selectFornecedor = document.querySelector("#fornecedor");
  const selectProduto = document.querySelector("#produto");

  if (selectFornecedor) {
    const fornecedores = await listar("fornecedores");
    selectFornecedor.innerHTML =
      '<option value="">Selecione um fornecedor</option>';

    for (const fornecedor of fornecedores) {
      selectFornecedor.innerHTML += `<option value="${fornecedor.id_fornecedor}">${fornecedor.nome}</option>`;
    }
  }

  if (selectProduto) {
    const produtos = await listarProdutos();
    selectProduto.innerHTML = '<option value="">Selecione um produto</option>';

    for (const produto of produtos) {
      selectProduto.innerHTML += `<option value="${produto.id_produto}">${produto.nome}</option>`;
    }
  }
}

const formularioVinculo = document.querySelector("#form-fornecedor-produto");
if (formularioVinculo) {
  formularioVinculo.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    try {
      await criar("fornecedores_produtos", {
        id_fornecedor: pegarNumero("#fornecedor"),
        id_produto: pegarNumero("#produto"),
      });

      formularioVinculo.reset();
      carregarVinculos();
      alert("Produto vinculado com sucesso!");
    } catch (erro) {
      console.log(erro);
      alert("Erro ao vincular produto.");
    }
  });
}

//________________________ CONFIGURACOES __________________________

async function carregarConfiguracoes() {
  const formLoja = document.querySelector("#form-loja");
  if (!formLoja) return;

  const loja = await listarLoja(pegarNumero("#loja") || 1);

  if (loja) {
    document.querySelector("#nome").value = loja.nome || "";
    document.querySelector("#cnpj").value = loja.cnpj || "";
    document.querySelector("#telefone").value = loja.telefone || "";
    document.querySelector("#email").value = loja.email || "";
    document.querySelector("#endereco").value = loja.endereco || "";
  }

  formLoja.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    try {
      await atualizarLoja(pegarNumero("#loja") || 1, {
        nome: pegarTexto("#nome"),
        cnpj: pegarTexto("#cnpj") || null,
        telefone: pegarTexto("#telefone") || null,
        email: pegarTexto("#email") || null,
        endereco: pegarTexto("#endereco") || null,
      });

      alert("Dados da loja atualizados!");
    } catch (erro) {
      console.log(erro);
      alert("Erro ao atualizar a loja.");
    }
  });
}

async function carregarUsuarios() {
  const tabela = document.querySelector("#lista-usuarios");
  if (!tabela) return;

  const usuarios = await listar("usuarios_acesso", "id_usuarios.asc");
  tabela.innerHTML = "";

  for (const usuario of usuarios) {
    tabela.innerHTML += `
      <tr>
        <td>${usuario.cargo}</td>
        <td>${usuario.email}</td>
        <td><button type="button" data-excluir-usuario="${usuario.id_usuarios}">Excluir</button></td>
      </tr>
    `;
  }

  document.querySelectorAll("[data-excluir-usuario]").forEach((botao) => {
    botao.addEventListener("click", async () => {
      if (!confirm("Deseja excluir este usuário?")) return;
      await excluir(
        "usuarios_acesso",
        "id_usuarios",
        botao.dataset.excluirUsuario,
      );
      carregarUsuarios();
    });
  });
}

const formularioUsuario = document.querySelector("#form-usuario");
if (formularioUsuario) {
  formularioUsuario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    try {
      await criar("usuarios_acesso", {
        id_loja: pegarNumero("#loja-usuario") || 1,
        cargo: pegarTexto("#cargo"),
        email: pegarTexto("#email-usuario"),
        senha: pegarTexto("#senha"),
      });

      formularioUsuario.reset();
      carregarUsuarios();
      alert("Usuário cadastrado com sucesso!");
    } catch (erro) {
      console.log(erro);
      alert("Erro ao cadastrar usuário.");
    }
  });
}

//________________________ INICIO _________________________________

async function carregarInicio() {
  if (
    !document.querySelector("#total-produtos") &&
    !document.querySelector("#total-recebido")
  )
    return;

  try {
    const produtos = await listarProdutos();
    const pagamentos = await listar("pagamentos");

    let quantidade = 0;
    let capital = 0;
    let recebido = 0;
    let pendente = 0;

    for (const produto of produtos) {
      quantidade += Number(produto.qtd || 0);
      capital += Number(produto.qtd || 0) * Number(produto.preco_custo || 0);
    }

    for (const pagamento of pagamentos) {
      if (pagamento.data_paga) {
        recebido += Number(pagamento.valor || 0);
      } else {
        pendente += Number(pagamento.valor || 0);
      }
    }

    if (document.querySelector("#total-produtos")) {
      document.querySelector("#total-produtos").textContent = quantidade;
      document.querySelector("#valor-estoque").textContent =
        formatoReal(capital);
      document.querySelector("#total-caixa").textContent =
        formatoReal(recebido);
      document.querySelector("#total-rua").textContent = formatoReal(pendente);
    }

    if (document.querySelector("#total-recebido")) {
      document.querySelector("#total-recebido").textContent =
        formatoReal(recebido);
      document.querySelector("#total-pendente").textContent =
        formatoReal(pendente);

      const vendas = await listar("vendas");
      document.querySelector("#total-vendas").textContent = vendas.length;
    }
  } catch (erro) {
    console.log(erro);
  }
}

//________________________ FINANCEIRO _____________________________

async function carregarPagamentos() {
  const tabela = document.querySelector("#lista-pagamentos");
  if (!tabela) return;

  const pagamentos = await listar("pagamentos", "data_paga.desc");
  tabela.innerHTML = "";

  for (const pagamento of pagamentos) {
    tabela.innerHTML += `
      <tr>
        <td>${pagamento.cod_pagamento}</td>
        <td>${formatoReal(pagamento.valor)}</td>
        <td>${pagamento.contato}</td>
        <td>${pagamento.descricao || "-"}</td>
        <td>${mostrarData(pagamento.data_paga)}</td>
        <td><button type="button" data-excluir-pagamento="${pagamento.id_pagamentos}">Excluir</button></td>
      </tr>
    `;
  }

  document.querySelectorAll("[data-excluir-pagamento]").forEach((botao) => {
    botao.addEventListener("click", async () => {
      if (!confirm("Deseja excluir este pagamento?")) return;
      await excluir(
        "pagamentos",
        "id_pagamentos",
        botao.dataset.excluirPagamento,
      );
      carregarPagamentos();
    });
  });
}

async function carregarVendas() {
  const tabela = document.querySelector("#lista-vendas");
  if (!tabela) return;

  const vendas = await listar("vendas", "data_venda.desc");
  const clientes = await listar("clientes");
  tabela.innerHTML = "";

  for (const venda of vendas) {
    let nomeCliente = "Cliente não informado";

    for (const cliente of clientes) {
      if (cliente.id_cliente === venda.id_cliente) {
        nomeCliente = cliente.nome;
        break;
      }
    }

    tabela.innerHTML += `
      <tr>
        <td>${nomeCliente}</td>
        <td>${formatoReal(venda.valor_total)}</td>
        <td>${venda.forma_pagamento}</td>
        <td>${venda.parcelas || "-"}</td>
        <td>${mostrarData(venda.data_venda)}</td>
        <td><button type="button" data-excluir-venda="${venda.id_venda}">Excluir</button></td>
      </tr>
    `;
  }

  document.querySelectorAll("[data-excluir-venda]").forEach((botao) => {
    botao.addEventListener("click", async () => {
      if (!confirm("Deseja excluir esta venda?")) return;
      await excluir("vendas", "id_venda", botao.dataset.excluirVenda);
      carregarVendas();
    });
  });
}

const formularioPagamento = document.querySelector("#form-pagamento");
if (formularioPagamento) {
  formularioPagamento.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    try {
      await criar("pagamentos", {
        id_vendas: pegarNumero("#venda"),
        cod_pagamento: pegarNumero("#codigo"),
        descricao: pegarTexto("#descricao") || null,
        contato: pegarTexto("#contato"),
        data_paga: new Date().toISOString(),
        valor: pegarNumero("#valor"),
      });

      formularioPagamento.reset();
      carregarPagamentos();
      carregarInicio();
      alert("Pagamento cadastrado com sucesso!");
    } catch (erro) {
      console.log(erro);
      alert("Erro ao cadastrar pagamento.");
    }
  });
}

//________________________ PDV / VENDAS ___________________________

let itensVenda = [];

async function carregarClientesProdutos() {
  const selectCliente = document.querySelector("#cliente");
  const selectProduto = document.querySelector("#produto");
  const selectTamanho = document.querySelector("#tamanho");
  const selectVenda = document.querySelector("#venda");

  if (selectCliente) {
    const clientes = await listar("clientes");
    selectCliente.innerHTML = '<option value="">Selecione um cliente</option>';

    for (const cliente of clientes) {
      selectCliente.innerHTML += `<option value="${cliente.id_cliente}">${cliente.nome}</option>`;
    }
  }

  if (selectProduto) {
    const produtos = await listarProdutos();
    selectProduto.innerHTML = '<option value="">Selecione um produto</option>';

    for (const produto of produtos) {
      selectProduto.innerHTML += `<option value="${produto.id_produto}">${produto.nome} - ${produto.codigo_p}</option>`;
    }
  }

  if (selectTamanho) {
    const tamanhos = await listar("produto_tamanhos");
    selectTamanho.innerHTML = '<option value="">Sem tamanho</option>';

    for (const tamanho of tamanhos) {
      selectTamanho.innerHTML += `<option value="${tamanho.id_tamanho}">${tamanho.tamanho}</option>`;
    }
  }

  if (selectVenda) {
    const vendas = await listar("vendas");
    selectVenda.innerHTML = '<option value="">Selecione uma venda</option>';

    for (const venda of vendas) {
      selectVenda.innerHTML += `<option value="${venda.id_venda}">Venda ${venda.id_venda}</option>`;
    }
  }
}

async function buscarProduto(id) {
  const resposta = await fetch(
    `https://iqjsahuamgzskbktupci.supabase.co/rest/v1/produtos?id_produto=eq.${id}&select=*`,
    {
      headers: { apikey: "sb_publishable_ScRr0vEWNUa6861mQg8lsg_wsj_FRxv" },
    },
  );

  const dados = await resposta.json();
  return dados[0];
}

async function buscarTamanho(id) {
  const resposta = await fetch(
    `https://iqjsahuamgzskbktupci.supabase.co/rest/v1/produto_tamanhos?id_tamanho=eq.${id}&select=*`,
    {
      headers: { apikey: "sb_publishable_ScRr0vEWNUa6861mQg8lsg_wsj_FRxv" },
    },
  );

  const dados = await resposta.json();
  return dados[0];
}

const botaoAdicionarItem = document.querySelector("#adicionar-item");
if (botaoAdicionarItem) {
  botaoAdicionarItem.addEventListener("click", () => {
    const produtoId = pegarNumero("#produto");
    const tamanhoId = pegarNumero("#tamanho") || null;
    const quantidade = pegarNumero("#quantidade");

    if (!produtoId || quantidade < 1) {
      alert("Selecione o produto e informe a quantidade.");
      return;
    }

    itensVenda.push({
      id_produto: produtoId,
      id_tamanho: tamanhoId,
      quantidade: quantidade,
    });

    const lista = document.querySelector("#lista-itens");
    lista.innerHTML = "";

    for (let i = 0; i < itensVenda.length; i++) {
      lista.innerHTML += `<li>Produto ${itensVenda[i].id_produto} - Quantidade: ${itensVenda[i].quantidade}</li>`;
    }
  });
}

const formularioClienteVenda = document.querySelector("#form-cliente-venda");
if (formularioClienteVenda) {
  formularioClienteVenda.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    try {
      await criar("clientes", {
        id_loja: 1,
        nome: pegarTexto("#nome_cliente"),
        cpf: pegarTexto("#cpf_cliente"),
        telefone: pegarTexto("#telefone_cliente") || null,
        data_cadastro: new Date().toISOString(),
      });

      formularioClienteVenda.reset();
      carregarClientesProdutos();
      alert("Cliente cadastrado com sucesso!");
    } catch (erro) {
      console.log(erro);
      alert("Erro ao cadastrar cliente.");
    }
  });
}

const formularioVenda = document.querySelector("#form-venda");
if (formularioVenda) {
  formularioVenda.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (itensVenda.length === 0) {
      alert("Adicione pelo menos um item.");
      return;
    }

    try {
      let valorTotal = 0;

      for (const item of itensVenda) {
        const produto = await buscarProduto(item.id_produto);
        valorTotal += Number(produto.preco_venda || 0) * item.quantidade;
      }

      const vendasCriadas = await criar("vendas", {
        id_financeiro: null,
        id_cliente: pegarNumero("#cliente") || null,
        valor_total: valorTotal,
        forma_pagamento: pegarTexto("#forma_pagamento"),
        parcelas: pegarNumero("#parcelas") || null,
        data_venda: new Date().toISOString(),
      });

      const venda = vendasCriadas[0];

      for (const item of itensVenda) {
        const produto = await buscarProduto(item.id_produto);

        await criar("itens_venda", {
          id_venda: venda.id_venda,
          id_produto: item.id_produto,
          id_tamanho: item.id_tamanho,
          quantidade: item.quantidade,
          preco_unitario: produto.preco_venda,
        });

        await atualizar("produtos", "id_produto", item.id_produto, {
          qtd: Number(produto.qtd || 0) - item.quantidade,
        });

        if (item.id_tamanho) {
          const tamanho = await buscarTamanho(item.id_tamanho);
          await atualizar("produto_tamanhos", "id_tamanho", item.id_tamanho, {
            quantidade: Number(tamanho.quantidade || 0) - item.quantidade,
          });
        }
      }

      itensVenda = [];
      document.querySelector("#lista-itens").innerHTML =
        "<li>Nenhum item adicionado.</li>";
      document.querySelector("#valor-total").textContent = "R$ 0,00";
      formularioVenda.reset();

      alert("Venda finalizada com sucesso!");
      carregarVendas();
      carregarInicio();
    } catch (erro) {
      console.log(erro);
      alert("Erro ao finalizar venda.");
    }
  });
}

//________________________ TAMANHOS E PESQUISAS __________________

async function carregarTamanhos() {
  const tabela = document.querySelector("#lista-tamanhos");
  if (!tabela) return;

  const produtoId = pegarNumero("#id") || pegarNumero("#id_produto_tamanho");
  if (!produtoId) {
    tabela.innerHTML =
      '<tr><td colspan="3">Informe o produto para ver os tamanhos.</td></tr>';
    return;
  }

  const tamanhos = await listar("produto_tamanhos");
  tabela.innerHTML = "";

  for (const tamanho of tamanhos) {
    if (tamanho.id_produto !== produtoId) continue;

    tabela.innerHTML += `
      <tr>
        <td>${tamanho.tamanho || "-"}</td>
        <td>${tamanho.quantidade}</td>
        <td><button type="button" data-excluir-tamanho="${tamanho.id_tamanho}">Excluir</button></td>
      </tr>
    `;
  }

  document.querySelectorAll("[data-excluir-tamanho]").forEach((botao) => {
    botao.addEventListener("click", async () => {
      if (!confirm("Deseja excluir este tamanho?")) return;
      await excluir(
        "produto_tamanhos",
        "id_tamanho",
        botao.dataset.excluirTamanho,
      );
      carregarTamanhos();
    });
  });
}

const formularioTamanho = document.querySelector("#form-tamanho");
if (formularioTamanho) {
  formularioTamanho.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    try {
      await criar("produto_tamanhos", {
        id_produto: pegarNumero("#id") || pegarNumero("#id_produto_tamanho"),
        tamanho: pegarTexto("#tamanho") || null,
        quantidade: pegarNumero("#quantidade_tamanho"),
      });

      formularioTamanho.reset();
      carregarTamanhos();
      alert("Tamanho cadastrado com sucesso!");
    } catch (erro) {
      console.log(erro);
      alert("Erro ao cadastrar tamanho.");
    }
  });
}

const campoProdutoTamanho = document.querySelector("#id");
if (campoProdutoTamanho) {
  campoProdutoTamanho.addEventListener("input", carregarTamanhos);
}

function configurarBusca(seletor, tabela) {
  const campo = document.querySelector(seletor);
  if (!campo || !tabela) return;

  campo.addEventListener("input", () => {
    const textoBusca = campo.value.toLowerCase();

    tabela.querySelectorAll("tbody tr").forEach((linha) => {
      linha.style.display = linha.textContent.toLowerCase().includes(textoBusca)
        ? ""
        : "none";
    });
  });
}

configurarBusca("#busca-produtos", document.querySelector("table"));
configurarBusca(
  "#busca-vendas",
  document.querySelector("#lista-vendas")?.closest("table"),
);
configurarBusca(
  "#busca-pagamentos",
  document.querySelector("#lista-pagamentos")?.closest("table"),
);
configurarBusca(
  "#busca-clientes",
  document.querySelector("#lista-clientes")?.closest("table"),
);
configurarBusca(
  "#busca-fornecedores",
  document.querySelector("#lista-fornecedores")?.closest("table"),
);
configurarBusca(
  "#busca-usuarios",
  document.querySelector("#lista-usuarios")?.closest("table"),
);

carregarTamanhos();

//________________________ INICIALIZACAO DAS PAGINAS _____________

carregarProdutos();
carregarCategorias();
carregarListaCategorias();
carregarClientes();
carregarFornecedores();
carregarVinculos();
preencherFornecedoresProdutos();
carregarConfiguracoes();
carregarUsuarios();
carregarInicio();
carregarPagamentos();
carregarVendas();
carregarClientesProdutos();

const botaoConsultar = document.querySelector("#btn-read");
if (botaoConsultar) {
  botaoConsultar.addEventListener("click", carregarProdutos);
}
