# Sistema de Gestão de Loja

Sistema web para gerenciamento de uma loja de roupas, com controle de estoque, produtos, categorias, clientes, fornecedores, vendas, pagamentos e configurações.

**Autor:** Taylor
**Disciplina:** Front-end e Banco de Dados
**Status:** Projeto concluído

## Sobre o projeto

O projeto foi desenvolvido com HTML, CSS e JavaScript no front-end e utiliza o Supabase como banco de dados e serviço de autenticação.

O acesso é feito pela página de login. Após entrar, o usuário pode navegar pelos módulos do sistema por meio do cabeçalho e menu lateral compartilhados.

## Funcionalidades

- Login de usuários.
- Controle de usuários de acesso.
- Cadastro, consulta, alteração e exclusão de produtos.
- Cadastro e gerenciamento de categorias.
- Cadastro e consulta de clientes.
- Cadastro e consulta de fornecedores.
- Vinculação de produtos a fornecedores.
- Cadastro de tamanhos e quantidades por tamanho.
- Cadastro e consulta de vendas no PDV.
- Atualização automática do estoque após uma venda.
- Cadastro e consulta de pagamentos.
- Resumo de caixa, dívidas, estoque e vendas.
- Atualização dos dados da loja nas configurações.
- Busca de registros nas principais telas.
- Logout e identificação do usuário no cabeçalho.

## Tecnologias utilizadas

| Camada | Tecnologia |
| --- | --- |
| Estrutura | HTML5 |
| Estilos | CSS3 |
| Programação | JavaScript moderno com módulos ES |
| Banco de dados | PostgreSQL pelo Supabase |
| Autenticação | Supabase Auth |
| Comunicação | Fetch API REST |
| Modelo dos dados | SQL e DBML |
| Controle de versão | Git e GitHub |

## Estrutura do projeto

```text
sis_loja_v3/
├── index.html              # Página de login
├── css/
│   ├── style.css
│   └── variables.css
├── js/
│   ├── components.js       # Cabeçalho, navegação e rodapé
│   ├── login.js            # Autenticação
│   ├── main.js             # Regras e operações das páginas
│   └── supabase.js         # Comunicação com o Supabase
├── pages/
│   ├── inicio.html
│   ├── vendas.html
│   ├── estoque.html
│   ├── create.html
│   ├── update.html
│   ├── delete.html
│   ├── clientes.html
│   ├── fornecedores.html
│   ├── financeiro.html
│   └── config.html
└── database/
    ├── estrutura.sql
    ├── inserts.sql
    └── modelagem.dbml
```

## Banco de dados

O banco contém as entidades necessárias para o funcionamento da loja:

- Loja e estoque.
- Categorias e produtos.
- Tamanhos dos produtos.
- Usuários e cargos.
- Clientes.
- Fornecedores e vinculação com produtos.
- Vendas e itens de venda.
- Pagamentos e dados financeiros.

A estrutura das tabelas está em `database/estrutura.sql`, os dados iniciais em `database/inserts.sql` e o diagrama em `database/modelagem.dbml`.

## Pré-requisitos

- Navegador moderno.
- Conexão com a internet.
- Um servidor local para executar módulos JavaScript.
- Projeto configurado no Supabase.

## Instalação e execução

### 1. Clone o repositório

```bash
git clone https://github.com/2025331277-create/sistema-gestao-loja.git
```

### 2. Entre na pasta

```bash
cd sistema-gestao-loja
```

### 3. Inicie um servidor local

```bash
python3 -m http.server 5500
```

Acesse `http://localhost:5500` no navegador.

Também é possível utilizar a extensão Live Server do VS Code.

> O projeto usa módulos JavaScript. Por isso, deve ser executado por HTTP e não apenas abrindo o HTML diretamente.

## Como usar

1. Abra a página inicial.
2. Entre com um usuário existente no Supabase.
3. Use o menu lateral para acessar os módulos.
4. Cadastre e gerencie produtos, categorias e estoque.
5. Registre clientes, fornecedores e vendas.
6. Consulte pagamentos e o resumo financeiro.

## Configuração do Supabase

As credenciais e os endpoints são definidos em `js/supabase.js` e `js/login.js`.

Ao utilizar outro projeto Supabase, atualize:

- URL do projeto.
- Chave pública.
- Usuários e tabelas existentes no banco.
- Políticas de acesso às tabelas.



## Autor

- **Taylor** — [GitHub](https://github.com/2025331277-create)

## Licença

Projeto acadêmico desenvolvido para fins educacionais.