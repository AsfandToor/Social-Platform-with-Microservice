const { getAllChats, getChatById } = require('../service/chatService')

const chatResolver = {
  Query: {
    getChatById: async (_, { id }) => {
      return await getChatById(id)
    },
    getAllChats: async (_, { userId }) => {
      const response = await getAllChats()
      return response
    }
  }
}

module.exports = { chatResolver }
