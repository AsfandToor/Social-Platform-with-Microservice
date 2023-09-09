import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
    trim: true
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    trim: true
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Post'
  },
  image: {
    type: String,
    required: [true, 'Image is required!'],
    trim: true
  }
})
UserSchema.pre('save', function (next) {
  const SALT = 10
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, SALT)
  }
  next()
})
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
}
const UserModel = mongoose.model('User', UserSchema)
export default UserModel
