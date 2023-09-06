import { Types } from 'mongoose'
import { UserRepository } from '../repository/user.js'

const Repository = new UserRepository()

export class UserController {
  getAllUsers = async (req, res, next) => {
    console.log(`Request Made GetAll`)
    const response = await Repository.getAllUsers()
    res.send(response)
  }

  getUserDetail = async (req, res, next) => {
    const { id } = req.params
    const response = await Repository.getUserDetailAsync(new Types.ObjectId(id))
    res.send(response)
  }

  register = async (req, res, next) => {
    const response = await Repository.createAsync(req.body)
    res.send(response)
  }
}
