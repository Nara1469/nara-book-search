import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $email: String!, $password: String!) {
    loginUser(username: $username, eamil: $email, password: $password) {
      username
      email
      password
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, eamil: $email, password: $password) {
      username
      email
      password
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($username: String!, $email: String!, $password: String!) {
    saveBook(username: $username, eamil: $email, password: $password) {
      username
      email
      password
    }
  }
`;