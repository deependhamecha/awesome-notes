# Simple Hello World Example

There are 2 things required to setup Apollo server.

1. Type Definitions
2. Resolvers

### Type Definitions

Type definitions—written using the Schema Definition Language (SDL)—are the strict blueprint of your API. They specify:

- What operations clients can run (Query, Mutation, Subscription).
- The shape and fields of each data object (e.g., Product, User, Category).
- The data types of those fields (String, Int, Float, Boolean, ID, or custom types).
- Which fields are mandatory or optional using the ! (non-nullable) modifier.

TypeDefs contain no executable programming logic; they only define structure and validate incoming requests before any code runs.

Example:

```graphql
# The Blueprint
type Query {
  product(id: ID!): Product
  products: [Product!]!
}

type Product {
  id: ID!
  name: String!
  price: Float!
  category: Category
}

type Category {
  id: ID!
  name: String!
}
```

### Resolvers

A resolver is a function that populates the data for a specific field in your schema. Whenever a client requests a field, the GraphQL execution engine calls the corresponding resolver function to return the actual value.

Resolvers are responsible for the real-world work:

- Reading from or writing to a database (SQL, MongoDB, Redis).
- Calling internal microservices or third-party REST APIs.
- Calculating derived data (e.g., discounts, formatting, aggregations).

Example:

```graphql
// The Implementation
const resolvers = {
  Query: {
    // Resolver for Query.products
    products: async () => {
      return await db.products.findMany();
    },
    // Resolver for Query.product(id: ...)
    product: async (parent, args, context) => {
      return await db.products.findById(args.id);
    },
  },

  Product: {
    // Nested/Field resolver for Product.category
    category: async (parent) => {
      // 'parent' is the product object returned by the query above
      return await db.categories.findById(parent.categoryId);
    },
  },
};
```

### To Run this project:
```sh
node index
```
Open http://localhost:4000.

Paste this:
```
query {
  hello
}
```

Click **Execute/Run**.

It should return:

![Output](../assets/simple_output.png)
