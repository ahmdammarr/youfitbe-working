const { getUserId } = require("../utils");

//Users
function users(parent, args, context) {
  return context.prisma.users();
}
async function countUser(parent, args, context) {
  return await context.prisma
    .usersConnection()
    .aggregate()
    .count();
}

function admins(parent, args, context) {
  return context.prisma.admins();
}

function me(parent, args, context) {
  const userId = getUserId(context);
  return context.prisma.user({ id: userId });
}

//Testing
function posts(parent, args, context) {
  return context.prisma.links();
}
module.exports = {
  users,
  admins,
  countUser,
  me,
  posts
};
