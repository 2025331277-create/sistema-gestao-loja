DROP TABLE IF EXISTS itens_venda;
DROP TABLE IF EXISTS pagamentos;
DROP TABLE IF EXISTS vendas;
DROP TABLE IF EXISTS financeiro;
DROP TABLE IF EXISTS fornecedores_produtos;
DROP TABLE IF EXISTS produto_tamanhos;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS fornecedores;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS usuarios_acesso;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS estoque;
DROP TABLE IF EXISTS loja;

DROP DATABASE IF EXISTS loja;

CREATE DATABASE loja;

\c loja;

CREATE TABLE loja (
  id_loja SERIAL PRIMARY KEY,
  nome VARCHAR(45) NOT NULL,
  cnpj VARCHAR(14),
  telefone VARCHAR(20),
  email VARCHAR(100),
  endereco TEXT,
  data_criacao TIMESTAMP
);

CREATE TABLE usuarios_acesso (
  id_usuarios SERIAL PRIMARY KEY,
  id_loja INTEGER REFERENCES loja(id_loja),
  cargo VARCHAR(30) NOT NULL,
  senha VARCHAR(12) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE financeiro (
    id_financeiro SERIAL PRIMARY KEY,
    id_usuarios INTEGER REFERENCES usuarios_acesso(id_usuarios)
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

CREATE TABLE vendas (
    id_venda SERIAL PRIMARY KEY,
    id_financeiro INTEGER REFERENCES financeiro(id_financeiro),
   id_cliente INTEGER REFERENCES clientes(id_cliente),
   valor_total DECIMAL (10,2) NOT NULL,
   forma_pagamento VARCHAR(30),
   parcelas INT ,
   data_venda TIMESTAMP NOT NULL 
);




