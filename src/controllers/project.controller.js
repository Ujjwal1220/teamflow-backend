const Project = require("../models/project");

/**
 * CREATE PROJECT (Admin only)
 */
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      createdBy: req.userId,
      members: [req.userId],
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
};

/**
 * GET PROJECTS (Admin → all, User → only assigned)
 */
exports.getProjects = async (req, res) => {
  try {
    let projects;

    if (req.userRole === "admin") {
      projects = await Project.find()
        .populate("members", "name email role")
        .populate("createdBy", "name email");
    } else {
      projects = await Project.find({ members: req.userId })
        .populate("members", "name email role")
        .populate("createdBy", "name email");
    }

    res.json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

/**
 * ASSIGN USERS TO PROJECT (Admin only)
 */
exports.assignUsersToProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userIds } = req.body; // array of userIds

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    project.members = [...new Set([...project.members, ...userIds])];
    await project.save();

    res.json({
      success: true,
      message: "Users assigned successfully",
      project,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to assign users",
    });
  }
};

/**
 * DELETE PROJECT (Admin only)
 */
exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findByIdAndDelete(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
};
