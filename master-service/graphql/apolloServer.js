const { ApolloServer } = require('apollo-server-express')
const { readFileSync } = require('fs')

const { chatResolver } = require('../resolvers/chatResolver')
const { postResolver } = require('../resolvers/postResolver')
const { userResolver } = require('../resolvers/userResolver')

const typeDefs = readFileSync('./graphql/schema.gql', 'UTF-8')

const resolvers = [chatResolver, postResolver, userResolver]

const startApolloServer = async (app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })
  await server.start()
  server.applyMiddleware({ app })
}

module.exports = { startApolloServer }
