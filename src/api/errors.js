const errors = {
  users: {
    404: { message: "No User Found" },
    P2025: { message: "No User Found" },
    400: { message: "Missing Required Field" },
  },
  projects: {
    404: { message: "No Project Found" },
  },
  400: { message: "Bad request" },
  P2002: { message: "Unique constraint failed" },
};
module.exports = errors;
