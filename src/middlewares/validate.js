const { ZodError } = require("zod");
const AppError = require("../utils/appError");

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      req.body = parsed.body || {};
      req.params = parsed.params || {};
      req.query = parsed.query || {};

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(new AppError("Données invalides", 400, error.flatten()));
      }
      return next(error);
    }
  };
};

module.exports = validate;

