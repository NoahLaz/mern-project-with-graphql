// MONGOOSE MODELS
const Client = require("../../models/Client");
const ClientType = require("./ClientType");

const { GraphQLID, GraphQLList } = require("graphql");

// Client Fields
const ClientFields = {
  clients: {
    type: new GraphQLList(ClientType),
    resolve(parent, args) {
      return Client.find();
    },
  },
  client: {
    type: ClientType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Client.findById(args.id);
    },
  },
};

module.exports = ClientFields;
