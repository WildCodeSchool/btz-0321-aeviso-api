const verifyRole = require("../middlewares/verifyRole");

exports.user = () => verifyRole("USER", "ADMIN", "SUPERADMIN");
exports.admin = () => verifyRole("ADMIN", "SUPERADMIN");
exports.superadmin = () => verifyRole("SUPERADMIN");
