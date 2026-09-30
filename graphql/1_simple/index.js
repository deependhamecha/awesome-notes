import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

// 1. Schema: Defines a single query field returning a String
const typeDefs = `#graphql
    type Query {
        hello: String
    }
`;

// 2. Resolver: Supplies the value for that field
const resolvers = {
    Query: {
        hello: () => {
            return "Hello World";
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log("Server is ready at "+url);