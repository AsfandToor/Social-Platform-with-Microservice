
import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';

const apolloClient = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default apolloClient;