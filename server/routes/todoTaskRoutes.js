const express = require("express");
const taskController = require("../controller/taskController");
const router = express.Router();

router.get("/", taskController.getAllTasks);

router.post("/", taskController.createTask);

router.put("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

module.exports = router;
