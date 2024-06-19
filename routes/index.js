const express = require("express");
const router = express.Router();
const taskList = require("./taskList")

router.use(taskList)

module.exports = router