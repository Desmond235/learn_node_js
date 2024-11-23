const express = require('express');
const router = express.Router();
const {getAllTasks, createTask, getTask, UpdateTask, deleteTask} = require('../controllers/tasks')

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(UpdateTask).delete(deleteTask);

module.exports = router;