import { gql } from '@apollo/client';

 
export const AUTHORIZED_USER = gql`
  query getAuthorizedUser($includeReviews: Boolean) {
    authorizedUser {
      
      reviews @include(if: $includeReviews) {
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
          cursor
        }
        pageInfo {
           hasNextPage
        }
      }
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

export const GET_ALL_REPOSITORIES = gql`
  query GetAllRepositories($searchKeyword: String $first: Int $after: String)  {
    repositories (orderBy: RATING_AVERAGE searchKeyword: $searchKeyword first: $first after: $after) {
        edges {
          node {
            id
        fullName
        createdAt
        ratingAverage
        ownerName
        ownerAvatarUrl
        forksCount
        stargazersCount
        fullName
        description
        language
        reviewCount
        ratingAverage
          }
        }
        pageInfo   {
          endCursor
          startCursor
          hasNextPage
    
        }
      }
      
  }
`;