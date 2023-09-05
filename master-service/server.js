const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const { startApolloServer } = require('./graphql/apolloServer.js')
require('dotenv').config()

const app = express()
app.use(bodyParser.urlencoded({ extended: true ,limit: '50mb'}))

app.get('/', (req, res) => {
  res.json('Hello World')
})

startApolloServer(app)

const server = http.createServer(app)

server.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port 3000')
})
