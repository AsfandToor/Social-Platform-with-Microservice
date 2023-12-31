import { Types } from 'mongoose'
import { UserRepository } from '../repository/user.js'

const Repository = new UserRepository()

export class UserController {
  getAllUsers = async (req, res, next) => {
    const response = await Repository.getAllUsers()
    res.send(response)
  }

  getUserDetail = async (req, res, next) => {
    const { id } = req.params
    const response = await Repository.getUserDetailAsync(new Types.ObjectId(id))
    res.send(response)
  }

  upload = async (req, res, next) => {
    const imageUri = req.body.imageUri
    res.send({
      image: imageUri
    })
  }

  register = async (req, res, next) => {
    const response = await Repository.createAsync(req.body)
    res.send(response)
  }
}
