import * as _ from 'dotenv'
import jwt from 'jsonwebtoken'
import { AuthRepository } from '../repository/auth.js'
_.config()

const Repository = new AuthRepository()

export class AuthController {
  login = async (req, res, next) => {
    const { email, password } = req.body
    const response = await Repository.login(email, password)
    const token = jwt.sign({
      id: response._id
    }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.send({
      id: response._id,
      email: response.email,
      name: response.name,
      username: response.username,
      token
    })
  }
}
