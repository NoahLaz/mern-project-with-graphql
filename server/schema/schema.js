const ClientFields = require("./client/ClientFields");
const ProjectFields = require("./project/ProjectFields");
const ProjectMutation = require("./project/ProjectMutation");
const ClientMutation = require("./client/ClientMutation");

const { GraphQLObjectType, GraphQLSchema } = require("graphql");

// ROOT QUERY
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...ClientFields,
    ...ProjectFields,
  },
});

// MUTATIONS
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...ClientMutation,
    ...ProjectMutation,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});
