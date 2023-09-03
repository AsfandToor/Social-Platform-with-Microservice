
import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const apolloClient = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default apolloClient;