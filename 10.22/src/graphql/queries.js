import { gql } from '@apollo/client';

export const AUTHORIZED_USER = gql`
  query AuthorizedUser {
    authorizedUser {
      id
      username
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query GetRepositories ($id: ID!) {
    repository (id: $id) {
        id
        fullName
        stargazersCount
        ownerAvatarUrl
    language
    description
    forksCount
    ratingAverage
    url
    reviewCount
         reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
    }
  }
`;