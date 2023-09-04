import express from 'express'
import { AuthController } from '../controller/auth.js'

const Controller = new AuthController()
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello from auth-service')
})

router.post('/login', Controller.login)

export default router
