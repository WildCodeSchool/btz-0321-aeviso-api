const verifyRole =
  (...restRoles) =>
  (req, res, next) => {
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
      res.status(403);

      return next(error);
    }
  };

module.exports = verifyRole;
