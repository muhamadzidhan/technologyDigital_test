const router = require('express').Router()
const TaskListsController = require("../controllers/TaskListsController")

router.get('/tasks', TaskListsController.getTaskList)
router.get('/tasks/:id', TaskListsController.getTaskListById)
router.post('/tasks', TaskListsController.createTaskList)
router.put('/tasks/:id', TaskListsController.editTaskList)
router.delete('/tasks/:id', TaskListsController.deleteTaskList)

module.exports = router