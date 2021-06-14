const errors = {
  users: {
    404: { message: "No User Found" },
    204: { message: "User Deleted" },
    P2025: { message: "Bad Request" },
  },
  projects: {
    404: { message: "No Project Found" },
    204: { message: "Project Deleted" },
    P2025: { message: "Bad Request" },
  },
  400: { message: "Bad request" },
  P2002: { message: "Unique constraint failed" },
};
module.exports = errors;
