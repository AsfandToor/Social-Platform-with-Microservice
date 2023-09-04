import express from 'express'
import { UserController } from '../controller/user.js'

const router = express.Router()
const Controller = new UserController()

router.get('/', Controller.getAllUsers)

router.get('/:id', Controller.getUserDetail)

router.post('/register', Controller.register)

export default router
