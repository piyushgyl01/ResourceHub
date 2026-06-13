const Project = require("../models/Project");
const Assignment = require("../models/Assignment");

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("managerId", "name email")
      .sort({ createdAt: -1 });

    res.json({ projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "managerId",
      "name email"
    );

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      managerId: req.user.userId,
    });

    await project.save();
    await project.populate("managerId", "name email");

    res.status(201).json({ project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("managerId", "name email");

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const activeAssignments = await Assignment.find({ projectId: id });
    if (activeAssignments.length > 0) {
      return res.status(400).json({
        error:
          "Cannot delete project with active assignments. Please remove all assignments first.",
      });
    }

    await Project.findByIdAndDelete(id);

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
