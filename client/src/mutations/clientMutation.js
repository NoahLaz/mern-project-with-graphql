import { gql } from "@apollo/client";

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      phone
      email
    }
  }
`;

const ADD_CLIENT = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      id
      name
      phone
      email
    }
  }
`;

const UPDATE_CLIENT = gql`
  mutation updateClient(
    $id: ID!
    $name: String!
    $email: String!
    $phone: String!
  ) {
    updateClient(id: $id, name: $name, email: $email, phone: $phone) {
      id
      name
      phone
      email
    }
  }
`;

export { DELETE_CLIENT, ADD_CLIENT, UPDATE_CLIENT };
