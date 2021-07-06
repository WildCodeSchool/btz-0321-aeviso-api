const verifyToken = require("../../../middlewares/verifyToken");

const me = async (req, res, next) => {
  await verifyToken(req, res, next);
};
module.exports = me;
