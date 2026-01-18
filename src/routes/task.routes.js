const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const {
  createTask,
  getTasksByProject,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/task.controller");

// Create task (Admin)
router.post("/", authMiddleware, roleMiddleware("admin"), createTask);

// Get tasks by project
router.get("/project/:projectId", authMiddleware, getTasksByProject);

// Update task status
router.patch("/:taskId/status", authMiddleware, updateTaskStatus);

// Delete task (Admin)
router.delete("/:taskId", authMiddleware, roleMiddleware("admin"), deleteTask);

module.exports = router;
