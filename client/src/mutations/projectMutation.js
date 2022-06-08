import { gql } from "@apollo/client";

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
      name
      description
      status
    }
  }
`;

const ADD_PROJECT = gql`
  mutation addProject($name: String!, $description: String!, $clientId: ID!) {
    addProject(
      name: $name
      description: $description
      status: new
      clientId: $clientId
    ) {
      id
      name
      description
      status
      client {
        id
      }
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation updateProject(
    $id: ID!
    $name: String!
    $description: String!
    $status: String!
  ) {
    updateProject(
      id: $id
      name: $name
      description: $description
      status: $status
    ) {
      id
      name
      description
      status
    }
  }
`;

export { UPDATE_PROJECT, ADD_PROJECT, DELETE_PROJECT };
