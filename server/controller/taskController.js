const Task = require("../model/Task");

exports.getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({});
    return res.status(200).json({
      success: true,
      message: "All Tasks",
      allTasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while getting all task",
      error: error.message,
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({
      title,
      description,
      timestamp: new Date(),
    });
    const task = await newTask.save();
    return res.status(200).json({
      success: true,
      message: "task created",
      task,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while creating task",
      error: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const existingTask = await Task.findById(id);

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const updateData = completed
      ? { completed, timestamp: new Date() }
      : { title, description, timestamp: new Date() };

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Task updated",
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await Task.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      deleteTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
