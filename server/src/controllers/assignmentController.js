const Assignment = require("../models/Assignment");
const User = require("../models/User");
const Project = require("../models/Project");
const { getAvailableCapacity } = require("./engineerController");

const getAssignments = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "engineer") {
      query.engineerId = req.user.userId;
    }

    const assignments = await Assignment.find(query)
      .populate("engineerId", "name email skills seniority")
      .populate("projectId", "name description status")
      .sort({ startDate: -1 });

    res.json({ assignments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAssignment = async (req, res) => {
  try {
    const {
      engineerId,
      projectId,
      allocationPercentage,
      startDate,
      endDate,
      role,
    } = req.body;

    if (
      !engineerId ||
      !projectId ||
      !allocationPercentage ||
      !startDate ||
      !endDate ||
      !role
    ) {
      return res.status(400).json({
        error:
          "Missing required fields. Need: engineerId, projectId, allocationPercentage, startDate, endDate, role",
      });
    }

    const engineer = await User.findById(engineerId);
    if (!engineer) {
      return res.status(404).json({ error: "Engineer not found" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const availableCapacity = await getAvailableCapacity(
      engineerId,
      new Date(startDate),
      new Date(endDate)
    );

    if (allocationPercentage > availableCapacity) {
      return res.status(400).json({
        error: `Engineer only has ${availableCapacity}% capacity available for this period. Requested: ${allocationPercentage}%`,
      });
    }

    const assignment = new Assignment({
      engineerId,
      projectId,
      allocationPercentage: Number(allocationPercentage),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      role: role || "Developer",
    });

    await assignment.save();

    await assignment.populate("engineerId", "name email skills seniority");
    await assignment.populate("projectId", "name description status");

    res.status(201).json({ assignment });
  } catch (error) {
    console.error("Assignment creation error:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("engineerId", "name email skills seniority")
      .populate("projectId", "name description status");

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.json({ assignment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};
