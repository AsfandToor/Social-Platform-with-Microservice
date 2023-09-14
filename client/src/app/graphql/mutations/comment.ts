import { gql } from "@apollo/client";

export const Create_Comment_Mutation = gql`
  mutation Mutation($createCommentInput: CreateCommentInput) {
  createComment(createCommentInput: $createCommentInput) {
    comment
  }
}
`;
