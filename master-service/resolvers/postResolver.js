const { createPost, getPosts } = require("../service/postService");

const postResolver = {
  Query: {
    getPosts: async (_, { id }) => {
      return await getPosts(id);
    },
  },
  Mutation: {
    createPost: async (_, { createPostInput }) => {
      return await createPost(createPostInput);
    },
  },
};

module.exports = { postResolver };
