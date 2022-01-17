import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation CreateUser($username: String! $password: String!) {
    createUser(user: {username: $username, password: $password}) {
        id
       username
    }
  }
`;

export const AUTHORIZE_TOKEN = gql`
  mutation AuthorizeToken($username: String! $password: String!) {
    authorize(credentials:{username: $username, password: $password}) {
        accessToken
    }
  } 
`;