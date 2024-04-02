/**
 * This function can be used to wrap requests in a try/catch block
 * so the generic error can be passed to the error handling middleware.
 */
export const asyncWrapper = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
