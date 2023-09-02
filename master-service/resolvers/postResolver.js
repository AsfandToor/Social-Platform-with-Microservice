const { createPost } = require('../service/postService')

const postResolver = {
  Query: {},
  Mutation: {
    createPost: async (_, { createPostInput }) => {
      return await createPost(createPostInput)
    }
  }
}

module.exports = { postResolver }
