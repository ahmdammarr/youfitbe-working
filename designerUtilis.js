const jwt = require("jsonwebtoken");
const APP_SECRETA = "Admin-is-aw3some";

function getAdminId(context) {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRETA);
    //const { adminId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error("Not authenticated");
}

module.exports = {
  APP_SECRETA,
  getAdminId
};

//if it's not working yet crate new server
