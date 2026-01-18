const User = require("../models/user");

const roleMiddleware = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      if (user.role !== requiredRole) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }

      next();
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Authorization failed",
      });
    }
  };
};

module.exports = roleMiddleware;
