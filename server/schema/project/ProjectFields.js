// MONGOOSE MODELS
const Project = require("../../models/Project");
const ProjectType = require("./ProjectType");

const { GraphQLID, GraphQLList } = require("graphql");

// ProjectFields
const ProjectFields = {
  projects: {
    type: new GraphQLList(ProjectType),
    resolve(parent, args) {
      return Project.find();
    },
  },
  project: {
    type: ProjectType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Project.findById(args.id);
    },
  },
};

module.exports = ProjectFields;
