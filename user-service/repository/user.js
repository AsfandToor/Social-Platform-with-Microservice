import UserModel from '../model/user.js'

export class UserRepository {
  getAllUsers = async () => {
    const users = await UserModel.find()
    return users
  }

  getUserDetailAsync = async (id) => {
    const user = await UserModel.findById(id)
    return user
  }

  createAsync = async (user) => {
    const newUser = new UserModel(user)
    return await newUser.save()
  }
}
