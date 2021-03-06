import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation SIGN_UP($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      id
      email
      username
      roles
      createdAt
    }
  }
`;

export const SIGN_IN = gql`
  mutation SIGN_IN($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      id
      email
      username
      roles
      createdAt
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SIGN_OUT {
    signout {
      message
    }
  }
`;

export const REQUEST_TO_RESET_PASSWORD = gql`
  mutation REQUEST_TO_RESET_PASSWORD($email: String!) {
    requestResetPassword(email: $email) {
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      message
    }
  }
`;

export const UPDATE_ROLES = gql`
  mutation UPDATE_ROLES($userId: String!, $newRoles: [String!]!) {
    updateRoles(userId: $userId, newRoles: $newRoles) {
      id
      email
      username
      roles
      createdAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation DELETE_USERS($userId: String!) {
    deleteUser(userId: $userId) {
      message
    }
  }
`;
