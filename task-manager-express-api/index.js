import express from "express";
import tasksRouter from "./routes/tasks/module.js";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connect.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import { notNound } from "./middleware/not-found.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/v1/tasks", tasksRouter);

app.get("/api/v1/tasks", (req, res) => {
  res.send("Hello world");
});

app.use(notNound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectToMongoDB();
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

start();
