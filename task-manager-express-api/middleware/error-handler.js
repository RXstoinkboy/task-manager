import mongoose from "mongoose";
import { CustomApiError } from "../errors/custom-error.js";

/**
 * Generic errors are handled in the end
 * Others are handled based on Error class instance
 * which is used to create error in the controller
 */
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json(err);
  }

  res.status(500).json({ error: "Something went wrong" });
};

export default errorHandler;
