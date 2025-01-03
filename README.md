# **Documentação do Projeto: Product API**

## **Visão Geral**
A **Product API** é um serviço desenvolvido em **NestJS** que utiliza **TypeORM** e **PostgreSQL** para gerenciar produtos, categorias e preços. A API suporta autenticação com **JWT** e fornece funcionalidades completas de CRUD para gerenciamento de usuários e produtos. A aplicação também inclui suporte a paginação e documentação interativa com **Swagger**.

---

## **Tecnologias Utilizadas**
- **NestJS**: Framework para construção de APIs escaláveis e estruturadas.
- **TypeORM**: ORM para manipulação de banco de dados.
- **GraphQL** e **REST**: Protocolo de comunicação utilizado nos endpoints.
- **PostgreSQL**: Banco de dados relacional.
- **Docker**: Contêineres para gerenciamento do ambiente.
- **Swagger**: Documentação interativa para REST API.
- **JWT (JSON Web Token)**: Autenticação segura.

---

## **Instalação**
### **Com Docker**
1. Certifique-se de que o Docker está instalado.
2. Renomeie o arquivo `.env.example` para `.env`:
3. Atualize as variáveis de ambiente no arquivo `.env` conforme necessário:
   ```
   API_PORT=4000
   DB_HOST=postgres
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=secret
   DB_NAME=product_api
   JWT_SECRET=your_jwt_secret
   ```
4. Suba os contêineres com o Docker Compose:
   ```bash
   docker-compose up --build
   ```
5. A API estará acessível em `http://localhost:4000`.
---

## **Endpoints**

### **Auth**
| Método | Endpoint   | Descrição                                      |
|--------|------------|----------------------------------------------|
| POST   | `/auth`    | Autentica um usuário e retorna o token JWT.   |

**Exemplo de Corpo da Requisição**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
---

### **User**
| Método | Endpoint       | Descrição                                     |
|--------|----------------|-----------------------------------------------|
| GET    | `/users`       | Retorna uma lista de usuários.                |
| POST   | `/users`       | Cria um novo usuário.                         |
| GET    | `/users/:id`   | Retorna informações de um usuário específico. |
| PATCH  | `/users/:id`   | Atualiza os dados de um usuário.              |
| DELETE | `/users/:id`   | Remove um usuário.                            |

---

## **Autenticação**
Os endpoints protegidos requerem um token JWT no cabeçalho da requisição:

**Exemplo de Cabeçalho**:
```
Authorization: Bearer <token>
```

---

## **Paginação**
A API suporta paginação com parâmetros opcionais `offset` e `limit` na mutation listagem de produtos:
---

## **Swagger**
A documentação interativa está disponível em:
```
http://localhost:4000/docs
```

---

## **GraphQL Playground**
A interface GraphQL está disponível em:
```
http://localhost:4000/graphql
```

---

## **Estrutura do Projeto**
```
src/
├── app.module.ts         # Módulo raiz
├── main.ts               # Bootstrap da aplicação
├── modules/              # Módulos da aplicação
│   ├── auth/             # Módulo de autenticação
│   ├── user/             # Módulo de usuários REST
│   ├── products/         # Módulo de produtos GRAPHQL
├── common/               # Código compartilhado (utilitários, constantes)
├── database/             # Configuração e migrações do banco de dados
```

---
## **Mutations e Queries no GraphQL**

### **Products**

| Nome              | Tipo     | Descrição                          |
| ----------------- | -------- | ---------------------------------- |
| `createProduct`   | Mutation | Cria um novo produto.              |
| `findAllProducts` | Query    | Lista todos os produtos paginados. |
| `findProductById` | Query    | Busca um produto pelo ID.          |
| `updateProduct`   | Mutation | Atualiza um produto existente.     |
| `removeProduct`   | Mutation | Remove um produto pelo ID.         |

### Exemplo de Mutation para Criar Produto

```graphql
mutation {
  createProduct(input: {
    name: "Produto A",
    category: FOOD,
    price: 1299
  }) {
    id
    name
    price
  }
}
```

### Exemplo de Query para Listar Produtos

```graphql
query {
  findAllProducts(paging: {
    offset: 0,
    limit: 10
  }) {
    nodes {
      id
      name
      price
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      totalCount
    }
  }
}
```

### Exemplo de Mutation para Atualizar Produto

```graphql
mutation {
  updateProduct(update: {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Produto A Atualizado",
    price: 1599
  }) {
    id
    name
    price
  }
}
```

### Exemplo de Mutation para Remover Produto

```graphql
mutation {
  removeProduct(id: "123e4567-e89b-12d3-a456-426614174000")
}
```
