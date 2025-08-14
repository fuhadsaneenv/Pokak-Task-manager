import express from "express";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../Controller/taskController.js";
import protect from "../Middleware/authMiddleware.js";

const Taskrouter = express.Router();

Taskrouter.get("/", protect, getTasks);
Taskrouter.post("/", protect, createTask);
Taskrouter.put("/:id", protect, updateTask);
Taskrouter.delete("/:id", protect, deleteTask);

export default Taskrouter;
