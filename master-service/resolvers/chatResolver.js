const {
  getAllChats,
  getChatById,
  createMessage,
  createChat,
  updateChat,
  updateMessage,
  deleteChat,
  deleteMessage
} = require('../service/chatService')

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
    createMessage: async (_, { createMessageInput }) => {
      const response = await createMessage(createMessageInput)
      return response
    },
    updateChat: async (_, { chatId, name }) => {
      const response = await updateChat(chatId, name)
      return response
    },
    updateMessage: async (_, { messageId, message }) => {
      const response = await updateMessage(messageId, message)
      return response
    },
    deleteMessage: async (_, { messageId }) => {
      const response = await deleteMessage(messageId)
      return response
    },
    deleteChat: async (_, { chatId }) => {
      const response = await deleteChat(chatId)
      return response
    }
  }
}

module.exports = { chatResolver }
