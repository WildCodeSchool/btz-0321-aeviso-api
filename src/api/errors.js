const errors = {
  users: {
    404: { message: "No User Found" },
    204: { message: "User Deleted" },
    P2025: { message: "No User Found" },
  },
  400: { message: "Missing Required Field" },
  P2002: { message: "Unique constraint failed" },
};
module.exports = errors;
