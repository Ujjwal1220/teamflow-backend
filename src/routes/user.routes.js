const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const {
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
} = require("../controllers/user.controller");

// Admin only routes
router.get("/", authMiddleware, roleMiddleware("admin"), getAllUsers);

router.patch(
  "/:id/role",
  authMiddleware,
  roleMiddleware("admin"),
  updateUserRole
);

router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  toggleUserStatus
);

module.exports = router;
