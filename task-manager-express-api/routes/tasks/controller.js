import Task from "./models.js";
import { asyncWrapper } from "../../middleware/async-wrapper.js";
import { CustomApiError } from "../../errors/custom-error.js";

export const getAllTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.find({});
  res.status(200).json(tasks);
});

export const createTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

export const getTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) {
    return next(new CustomApiError(`Task not found with id of ${id}`, 404));
  }
  res.status(200).json(task);
});

export const updateTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  /**
   * by default task BEFORE the update is returned from this query
   * and validators are NOT being run
   */
  const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(new CustomApiError(`Task not found with id of ${id}`, 404));
  }
  res.status(200).json(task);
});

export const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    return next(new CustomApiError(`Task not found with id of ${id}`, 404));
  }
  res.status(200).json(task);
});
