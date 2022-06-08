// MONGOOSE MODELS
const Client = require("../../models/Client");
const ClientType = require("./ClientType");
const Project = require("../../models/Project");

const { GraphQLID, GraphQLString, GraphQLNonNull } = require("graphql");

// MUTATIONS
const ClientMutation = {
  // ADD CLIENT
  addClient: {
    type: ClientType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      phone: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      const client = new Client({
        name: args.name,
        email: args.email,
        phone: args.phone,
      });

      return client.save();
    },
  },
  // UPDATE CLIENT
  updateClient: {
    type: ClientType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
    },
    resolve(parent, args) {
      return Client.findByIdAndUpdate(
        args.id,
        {
          $set: {
            name: args.name,
            email: args.email,
            phone: args.password,
          },
        },
        { new: true }
      );
    },
  },
  // DELETE CLIENT
  deleteClient: {
    type: ClientType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(parent, args) {
      Project.find({ clientId: args.id })
        .then((projects) => {
          projects.forEach((project) => project.remove());
        })
        .catch((err) => console.log(err));
      return Client.findByIdAndRemove(args.id);
    },
  },
};

module.exports = ClientMutation;
