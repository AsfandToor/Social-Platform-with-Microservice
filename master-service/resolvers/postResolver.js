const { createPost, createComment, getPosts, getPostById, updatePost, deletePost } = require('../service/postService')

const postResolver = {
  Query: {
    getPosts: async (_, { page, limit }) => {
      const response = await getPosts(page, limit)
      return response
    },
    getPostById: async (_, { postId }) => {
      const response = await getPostById(postId)
      return response
    }
  },
  Mutation: {
    createPost: async (_, { createPostInput }) => {
      return await createPost(createPostInput)
    },
    createComment: async (_, { createCommentInput }) => {
      return await createComment(createCommentInput)
    },
    updatePost: async (_, { postId, updatePostInput }) => {
      return await updatePost(postId, updatePostInput)
    },
    deletePost: async (_, { postId }) => {
      return await deletePost(postId)
    }
  }
}

module.exports = { postResolver }
