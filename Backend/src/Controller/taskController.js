import Task from "../Models/taskModel.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  req.user = decoded.id;

  res.json(tasks);
};

export const createTask = async (req, res) => {
  const task = new Task({ ...req.body, user: req.user });
  const saved = await task.save();
  res.status(201).json(saved);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.user.toString() !== req.user)
    return res.status(403).json({ message: "Not authorized" });

  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.user.toString() !== req.user)
    return res.status(403).json({ message: "Not authorized" });

  await task.remove();
  res.json({ message: "Task deleted" });
};
