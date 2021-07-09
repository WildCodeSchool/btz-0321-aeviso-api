const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("You need to login.");
    }

    req.user = jwt.verify(token, process.env.SECRET);

    return next();
  } catch (err) {
    res.status(401);

    return next(err);
  }
};
