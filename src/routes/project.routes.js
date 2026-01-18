const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const {
  createProject,
  getProjects,
  assignUsersToProject,
  deleteProject,
} = require("../controllers/project.controller");

// Create project (Admin)
router.post("/", authMiddleware, roleMiddleware("admin"), createProject);

// Get projects (Admin/User)
router.get("/", authMiddleware, getProjects);

// Assign users (Admin)
router.patch(
  "/:projectId/users",
  authMiddleware,
  roleMiddleware("admin"),
  assignUsersToProject
);

// Delete project (Admin)
router.delete(
  "/:projectId",
  authMiddleware,
  roleMiddleware("admin"),
  deleteProject
);

module.exports = router;
