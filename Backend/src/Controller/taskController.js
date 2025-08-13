import taskModel from "../Models/taskModel.js";

// Get all tasks
export const getTasks = async (req, res) => {
  const tasks = await taskModel.find().sort({ createdAt: -1 });
  res.json(tasks);
};

// Create a task
export const createTask = async (req, res) => {
  try {
    const task = new taskModel(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const updated = await taskModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    await taskModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Toggle task completion
export const toggleTask = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
