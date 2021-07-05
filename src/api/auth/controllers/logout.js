const jwt = require("jsonwebtoken");

const logout = async (req, res, next) => {
  console.log(req.cookies);
  //   res.clearCookie("token");
};
module.exports = logout;
