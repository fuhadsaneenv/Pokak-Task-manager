import express from 'express';

import {   getTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTask } from '../Controller/taskController.js';

const Taskrouter = express.Router();

Taskrouter.get('/', getTasks);
Taskrouter.post('/', createTask);
Taskrouter.put('/:id', updateTask);
Taskrouter.delete('/:id', deleteTask);
Taskrouter.patch('/:id/toggle', toggleTask);

export default Taskrouter;
