const { getAllChats, getChatById, createChat, updateChat } = require('../service/chatService')

const chatResolver = {
  Query: {
    getChatById: async (_, { id }) => {
      return await getChatById(id)
    },
    getAllChats: async (_, { userId }) => {
      const response = await getAllChats()
      return response
    }
  },
  Mutation: {
    createChat: async (_, { createChatInput }) => {
      const response = await createChat(createChatInput)
      return response
    },
    updateChat: async (_, { chatId, name }) => {
      const response = await updateChat(chatId, name)
      return response
    }
  }
}

module.exports = { chatResolver }
