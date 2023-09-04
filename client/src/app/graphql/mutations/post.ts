import { gql } from "@apollo/client";

export const Create_Post_Mutation = gql`
  mutation CreatePost($createPostInput: CreatePostInput) {
    createPost(createPostInput: $createPostInput) {
      caption
    }
  }
`;
