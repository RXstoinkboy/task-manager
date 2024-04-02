import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "Task is required"],
    trim: true,
    maxlength: [20, "Task must be less than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Task", TaskSchema);
