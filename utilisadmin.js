const jwt = require("jsonwebtoken");
const APP_SECRETa = "GraphQL-is-aw3some-admin";

function getAdminId(context) {
  const Authorization = context.request.get("Authorization");
  console.log("auth", Authorization);
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    console.log("token", token);
    const { adminId } = jwt.verify(token, APP_SECRETa);
    console.log("userId", userId);
    console.log("AppSecret", APP_SECRETa);
    //const { adminId } = jwt.verify(token, APP_SECRET);
    return adminId;
  }

  throw new Error("Not authenticated");
}

module.exports = {
  APP_SECRETa,
  getAdminId
};

//if it's not working yet crate new server
