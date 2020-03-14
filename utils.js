const jwt = require("jsonwebtoken");
const APP_SECRETu = "GraphQL-is-aw3some";

function getUserId(context) {
  const Authorization = context.request.get("Authorization");
  console.log("auth", Authorization);
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    console.log("token", token);
    const { userId } = jwt.verify(token, APP_SECRETu);
    console.log("userId", userId);
    console.log("AppSecret", APP_SECRETu);
    //const { adminId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error("Not authenticated");
}

module.exports = {
  APP_SECRETu,
  getUserId
};

//if it's not working yet crate new server
