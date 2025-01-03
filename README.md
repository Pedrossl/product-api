
# **Project Documentation: Product API**

## **Overview**
The **Product API** is a service developed in **NestJS** utilizing **TypeORM** and **PostgreSQL** to manage products, categories, and prices. The API supports authentication with **JWT** and provides full CRUD functionality for managing users and products. The application also includes pagination support and interactive documentation with **Swagger**.

---

## **Technologies Used**
- **NestJS**: Framework for building scalable and structured APIs.
- **TypeORM**: ORM for database manipulation.
- **GraphQL** and **REST**: Protocols used for communication in endpoints.
- **PostgreSQL**: Relational database.
- **Docker**: Container management for environment setup.
- **Swagger**: Interactive documentation for the REST API.
- **JWT (JSON Web Token)**: Secure authentication.

---

## **Installation**
### **Using Docker**
1. Ensure Docker is installed.
2. Rename the `.env.example` file to `.env`:
3. Update the environment variables in the `.env` file as needed:
   ```
   API_PORT=4000
   DB_HOST=postgres
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=secret
   DB_NAME=product_api
   JWT_SECRET=your_jwt_secret
   ```
4. Start the containers using Docker Compose:
   ```bash
   docker-compose up --build
   ```
5. The API will be accessible at `http://localhost:4000`.

---

## **Endpoints**

All endpoints, queries and mutations are in the Product_Endpoints.json file

### **Auth**
| Method | Endpoint   | Description                              |
|--------|------------|------------------------------------------|
| POST   | `/auth`    | Authenticates a user and returns a JWT.  |

**Request Body Example**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

### **User**
| Method | Endpoint       | Description                              |
|--------|----------------|------------------------------------------|
| GET    | `/users`       | Returns a list of users.                |
| POST   | `/users`       | Creates a new user.                     |
| GET    | `/users/:id`   | Retrieves information of a specific user. |
| PATCH  | `/users/:id`   | Updates user data.                      |
| DELETE | `/users/:id`   | Removes a user.                         |

---

## **Authentication**
Protected endpoints require a JWT token in the request header:

**Header Example**:
```
Authorization: Bearer <token>
```

---

## **Swagger**
Interactive documentation is available at:
```
http://localhost:4000/docs
```

---

## **GraphQL Playground**
GraphQL interface is available at:
```
http://localhost:4000/graphql
```

---

## **GraphQL Mutations and Queries**

### **Products**

| Name               | Type     | Description                          |
|--------------------|----------|--------------------------------------|
| `createProduct`    | Mutation | Creates a new product.              |
| `findAllProducts`  | Query    | Lists all products with pagination. |
| `findProductById`  | Query    | Retrieves a product by ID.          |
| `updateProduct`    | Mutation | Updates an existing product.        |
| `removeProduct`    | Mutation | Removes a product by ID.            |

### Example Mutation to Create Product
The price should be sent in cents as it is an integer type.
```graphql
mutation {
  createProduct(input: {
    name: "Product A",
    category: FOOD,
    price: 1299
  }) {
    id
    name
    price
  }
}
```

### Example Query to List Products
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

### Example Mutation to Update Product
```graphql
mutation {
  updateProduct(update: {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Updated Product A",
    price: 1599
  }) {
    id
    name
    price
  }
}
```

### Example Mutation to Remove Product
```graphql
mutation {
  removeProduct(id: "123e4567-e89b-12d3-a456-426614174000")
}
```
