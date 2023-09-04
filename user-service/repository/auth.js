import UserModel from '../model/user.js'

export class AuthRepository {
  login = async (email, password) => {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw new Error('User not found')
    }
    const isPasswordMatch = await user.comparePassword(password)
    if (!isPasswordMatch) {
      throw new Error('Invalid password')
    }
    return user
  }
}
