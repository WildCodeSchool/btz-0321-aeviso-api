const bodyValidator = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);

    next();
  } catch (error) {
    res.status(422);
    next(error);
  }
};

module.exports = bodyValidator;
