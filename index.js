const { prisma } = require("./generated/prisma-client");
const { GraphQLServer } = require("graphql-yoga");
const Mutation = require("./resolvers/Mutation/Mutations");
const User = require("./resolvers/User");
const Query = require("./resolvers/Query");
const Link = require("./resolvers/Link");
//const Product = require("./resolvers/Product");
//const Color = require("./resolvers/Color");
//const Item = require("./resolvers/Item");
//const OrderRow = require("./resolvers/OrderRow");
//const Order = require("./resolvers/Order");
//const Category = require("./resolvers/Category");
//const Sizes = require("./resolvers/Sizes");
//const Qualities = require("./resolvers/Qualities");
//const Store = require("./resolvers/Store");
//const Designer = require("./resolvers/Designer");
//const Pcolors = require("./resolvers/Pcolors");
const resolvers = {
  Query,
  Mutation,
  User,

  Link
  // City
};

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context: request => {
    // console.log("request", request);
    return {
      ...request,
      prisma
    };
  }
});
server.start(() => console.log("Server is running on http://localhost:4000"));
