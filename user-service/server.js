import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import * as _ from 'dotenv'
import connectDB from './db/db.js'
import userRouter from './router/user.js'
import authRouter from './router/auth.js'

_.config()

const app = express()

// Middlewares
app.use(bodyParser.json())

// Routes
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

const server = http.createServer(app)

// Connect to MongoDB
connectDB()

server.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))
