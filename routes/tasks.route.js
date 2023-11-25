const { Router } = require('express');
const { getALlTasks, createTask, getTaskById, updateTaskById, deleteTaskById } = require('../controllers/tasks.contoller');

const router = Router();

router.get('/tasks', getALlTasks);
router.post('/tasks', createTask)
router.get('/tasks/:id',getTaskById)
router.put('/tasks/:id', updateTaskById)
router.delete('/tasks/:id', deleteTaskById)

module.exports=router;