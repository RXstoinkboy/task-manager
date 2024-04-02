import { CustomApiError } from "../errors/custom-error.js";

export const requestValidation = (schema) => async (req, res, next) => {
  try {
    const { error } = await schema.safeParseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (error) {
      return next(
        new CustomApiError(
          error.errors.map((err) => err.message).join(", "),
          400
        )
      );
    }

    return next();
  } catch (error) {
    next(error);
  }
};
