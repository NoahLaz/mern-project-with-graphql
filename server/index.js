const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const port = process.env.PORT || 5000;

const app = express();

//CONNECT TO DATABASE
connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(port, console.log(`Server running on port ${port}`));
