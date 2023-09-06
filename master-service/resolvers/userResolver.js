const { getAllUsers, login, createUser } = require('../service/userService.js')

const userResolver = {
  Query: {
    getAllUsers: async (_) => {
      return await getAllUsers()
    }
  },
  Mutation: {
    login: async (_, { email, password }) => {
      return await login(email, password)
    },
    register: async (_, { createUserInput }) => {
      return await createUser(createUserInput)
    }
  }
}

module.exports = { userResolver }
