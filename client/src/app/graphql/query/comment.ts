import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
 query GetComments($postId: ID!) {
  getPostById(postId: $postId) {
    comments {
      comment
      author
    }
  }
}
`;
