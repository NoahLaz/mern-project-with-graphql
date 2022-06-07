// MONGOOSE MODELS
const Project = require("../../models/Project");
const ProjectType = require("./ProjectType");

const {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

// MUTATIONS
const ProjectMutation = {
  // ADD PROJECT
  addProject: {
    type: ProjectType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      status: {
        type: new GraphQLEnumType({
          name: "ProjectStatus",
          values: {
            new: { value: "Not Started" },
            progress: { value: "In Progress" },
            complete: { value: "Complete" },
          },
        }),
        defaultValue: "Not Started",
      },
      clientId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      const project = new Project({
        name: args.name,
        description: args.description,
        status: args.status,
        clientId: args.clientId,
      });

      return project.save();
    },
  },

  // DELETE PROJECT
  deleteProject: {
    type: ProjectType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(parent, args) {
      return Project.findByIdAndRemove(args.id);
    },
  },

  // UPDATE PROJECT
  updateProject: {
    type: ProjectType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      status: {
        type: new GraphQLEnumType({
          name: "ProjectStatusUpdate",
          values: {
            new: { value: "Not Started" },
            progress: { value: "In Progress" },
            complete: { value: "Complete" },
          },
        }),
      },
    },
    resolve(parent, args) {
      return Project.findByIdAndUpdate(
        args.id,
        {
          $set: {
            name: args.name,
            description: args.description,
            status: args.status,
          },
        },
        { new: true }
      );
    },
  },
};

module.exports = ProjectMutation;
