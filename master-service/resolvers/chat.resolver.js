const chatResolver = {
  Query: {
    getChatById: (_, { id }) => {
      return {
        _id: id,
        name: 'getChat'
      }
    }
  }
}

module.exports = { chatResolver }
