const verifyRole =
  (...restRoles) =>
  async (req, res, next) => {
    try {
      const { role } = req.user;

      if (!restRoles.includes(role)) {
        res.status(403);

        throw new Error(
          `Insufficient permissions. Roles required: ${restRoles}.`
        );
      }

      return next();
    } catch (error) {
      res.status(422);

      return next(error);
    }
  };

module.exports = verifyRole;
