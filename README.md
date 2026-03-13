# Order Flow API 
O projeto é uma solução de um desafio de backend onde o foco é gerenciar o ciclo de vida de pedidos de compra. O objetivo principal do projeto foi implementar uma arquitetura leve, robusta e segura para o processamento de pedidos de forma eficiente.


# Estrutura do Projeto
``` 
├── server.js                  <-- Coloca a aplicação no ar
├── package.json               <-- Metadados
├── dockerfile                 <-- Receita da imagem API
├── docker-compose.yml         <-- Orquestrador 
├── README.md                  <-- Documentação do projeto
└── src/
    ├── app.js                 <-- Arquiteto da aplicação
    ├── config/
    │   └── database.js        <-- Conexão com o PostgreSQL (Pool)
    ├── routes/
    │   └── orderRoutes.js     <-- Define as URLs (caminhos/pedidos)
    ├── controllers/
    │   └── orderController.js <-- Lida com os requests/responses (req, res)
    ├── services/
    │   └── orderService.js    <-- Regras de negócio
    ├── middlewares/
    │   └── auth.js            <-- Middleware de autenticação (JWT)
    └── models/
        ├── orderModel.js      <-- Acesso ao banco de dados
        └── orderMapper.js     <-- Transformação do JSON 
        
```


# O que o código faz na prática:
`Gerenciamento de Pedidos:` Permite a criação (POST), leitura (GET), listagem (GET list), atualização (PUT) e remoção (DELETE) de pedidos.

`Segurança:` Implementa um sistema de autenticação via JWT (JSON Web Token). Toda e qualquer requisição à API é validada por um "porteiro" (middleware), garantindo que apenas usuários autenticados acessem os dados sensíveis.

`Integridade de Dados:` Utiliza transações do banco de dados (BEGIN/COMMIT/ROLLBACK) para assegurar que, caso uma parte da gravação falhe, o banco de dados não fique com dados parciais ou corrompidos.

`Planejamento Futurístico:` O sistema é dividido em camadas (Controller, Service, Repository), o que significa que se você precisar trocar seu banco de dados ou mudar uma regra de negócio, você altera apenas uma parte do código sem quebrar todo o sistema.

# Como Rodar o Projeto
## Pré-requisitos
- `Node.js instalado.`
- `PostgreSQL configurado.`
- `Docker instalado`
- `Um gerenciador de terminal (Git Bash, PowerShell ou VS Code).`

## Passos para execução
- Clone o repositório
- Cole o código a seguir no terminal:
```
git clone https://github.com/NataNogueira/order-flow-api.git
```
- Inicie a aplicação:
```
docker compose up --build
```

# Autenticação
A API utiliza o *JWT (JSON Web Token)*.
Para acessar os endpoints, você deve incluir o token no cabeçalho (Header) da requisição:
- Key: `Authorization`
- Value: `Bearer <SEU_TOKEN_AQUI>`
```
Exemplo: curl.exe -X GET http://localhost:3000/order/list -H "Authorization: Bearer <COLE_O_TOKEN_AQUI_SEM_AS_CHAVES>"
```


# Endpoints Principais
| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/order` | Cria um novo pedido |
| `GET` | `/order/list` | Lista todos os pedidos |
| `GET` | `/order/:id` | Busca pedido por ID |
| `PUT` | `/order/:id` | Atualiza um pedido |
| `DELETE` | `/order/:id` | Remove um pedido |


# Tecnologias e Dependências
Este projeto foi construído utilizando:
- `Node.js:` Ambiente de execução JavaScript.
- `Express:` Framework web para roteamento.
- `PostgreSQL:` Banco de dados relacional para persistência.
- `jsonwebtoken (JWT):` Segurança e autenticação.
- `dotenv:` Gerenciamento de variáveis de ambiente.
- `pg:` Driver de conexão com PostgreSQL.

#
<h3 align="center">

  <div style="display: inline_block"><br>
    <img align="center" alt="JavaScript" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg">
  </div>

</h3>