export const notNound = (req, res, next) => {
  res.status(404).sent("Resource not found");
};
