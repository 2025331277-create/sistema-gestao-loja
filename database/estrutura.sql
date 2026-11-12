CREATE TABLE loja (
  id_loja SERIAL PRIMARY KEY,
  nome VARCHAR(45) NOT NULL,
  cnpj VARCHAR(14),
  telefone VARCHAR(20),
  email VARCHAR(100),
  endereco TEXT,
  data_criacao TIMESTAMP
);

CREATE TABLE estoque (
  id_estoque SERIAL PRIMARY KEY,
  id_loja INTEGER REFERENCES loja(id_loja)
);

CREATE TABLE categorias (
  id_categorias SERIAL PRIMARY KEY,
  id_estoque INTEGER REFERENCES estoque(id_estoque),
  nome VARCHAR(30) NOT NULL,
  descricao TEXT
);

CREATE TABLE produtos (
   id_produto SERIAL PRIMARY KEY,
   id_categorias INTEGER REFERENCES categorias(id_categorias),
   codigo_p VARCHAR(20) UNIQUE NOT NULL,
   descricao TEXT,
   nome VARCHAR(20) NOT NULL,
   preco_custo DECIMAL(10,2) NOT NULL,
   preco_venda DECIMAL(10,2) NOT NULL,
   qtd INT NOT NULL DEFAULT 0,
   estoque_min INT NOT NULL DEFAULT 0,
   data_criacao TIMESTAMP NOT NULL
);

CREATE TABLE produto_tamanhos (
    id_tamanho SERIAL PRIMARY KEY,
    id_produto INTEGER REFERENCES produtos(id_produto),
    tamanho VARCHAR(10),
    quantidade INTEGER NOT NULL
);

CREATE TABLE usuarios_acesso (
  id_usuarios SERIAL PRIMARY KEY,
  id_loja INTEGER REFERENCES loja(id_loja),
  cargo VARCHAR(30) NOT NULL,
  senha VARCHAR(12) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,
    id_loja INTEGER REFERENCES loja(id_loja),
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(100),
    data_cadastro TIMESTAMP NOT NULL
);

CREATE TABLE fornecedores (
    id_fornecedor SERIAL PRIMARY KEY,
    id_loja INTEGER REFERENCES loja(id_loja),
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(14) UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(100),
    endereco TEXT,
    data_cadastro TIMESTAMP
);

CREATE TABLE fornecedores_produtos (
  id_fornecedor INTEGER REFERENCES fornecedores(id_fornecedor),
  id_produto INTEGER REFERENCES produtos(id_produto),
  PRIMARY KEY (id_fornecedor, id_produto)
);

CREATE TABLE financeiro (
    id_financeiro SERIAL PRIMARY KEY,
    id_usuarios INTEGER REFERENCES usuarios_acesso(id_usuarios)
);

CREATE TABLE vendas (
   id_venda SERIAL PRIMARY KEY,
   id_financeiro INTEGER REFERENCES financeiro(id_financeiro),
   id_cliente INTEGER REFERENCES clientes(id_cliente),
   valor_total DECIMAL(10,2) NOT NULL,
   forma_pagamento VARCHAR(30),
   parcelas INT,
   data_venda TIMESTAMP NOT NULL
);

CREATE TABLE pagamentos (
  id_pagamentos SERIAL PRIMARY KEY,
  id_vendas INTEGER REFERENCES vendas(id_venda),
  cod_pagamento INTEGER NOT NULL,
  descricao TEXT,
  contato VARCHAR(10) NOT NULL,
  data_paga TIMESTAMP,
  valor DECIMAL(10,2) NOT NULL
);

CREATE TABLE itens_venda (
   id_item SERIAL PRIMARY KEY,
   id_venda INTEGER REFERENCES vendas(id_venda),
   id_produto INTEGER REFERENCES produtos(id_produto),
   id_tamanho INTEGER REFERENCES produto_tamanhos(id_tamanho),
   quantidade INT NOT NULL,
   preco_unitario DECIMAL(10,2) NOT NULL
);
