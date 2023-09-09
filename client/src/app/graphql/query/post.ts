import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query Query($page: String!, $limit: String!) {
    getPosts(page: $page, limit: $limit) {
      docs {
        _id
        caption
        author
        images {
          url
        }
        comments {
        author
        comment
      }
        createdAt
      }
      totalDocs
      limit
      page
      totalPages
      hasPrevPage
      hasNextPage
    }
  }
`;
