import UserModel from '../model/user.js'
import { NotFoundError } from '../utils/error.js'

export class AuthRepository {
  login = async (email, password) => {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw new NotFoundError('User not found')
    }
    const isPasswordMatch = await user.comparePassword(password)
    if (!isPasswordMatch) {
      throw new NotFoundError('Invalid credentials')
    }
    return user
  }
}
