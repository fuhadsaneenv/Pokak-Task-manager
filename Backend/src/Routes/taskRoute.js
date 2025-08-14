import express from 'express';

import {   getTasks,
    createTask,
    updateTask,
    deleteTask,
     } from '../Controller/taskController.js';
// import protect from '../Middleware/authMiddleware.js';

const Taskrouter = express.Router();

Taskrouter.get('/',getTasks);
Taskrouter.post('/', createTask);
Taskrouter.put('/:id', updateTask);
Taskrouter.delete('/:id', deleteTask);

export default Taskrouter;
