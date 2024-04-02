import express from "express";
import {
  TaskCreateSchema,
  TaskDeleteSchema,
  TaskUpdateSchema,
} from "./schemas.js";
import { requestValidation } from "../../middleware/request-validation.js";
import * as controller from "./controller.js";

const router = express.Router();

router
  .route("/")
  .get(controller.getAllTasks)
  .post([requestValidation(TaskCreateSchema), controller.createTask]);
router
  .route("/:id")
  .get(controller.getTask)
  .patch([requestValidation(TaskUpdateSchema), controller.updateTask])
  .delete([requestValidation(TaskDeleteSchema), controller.deleteTask]);

export default router;
