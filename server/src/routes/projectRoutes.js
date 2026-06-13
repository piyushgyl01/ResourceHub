const express = require("express");
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { authenticateToken, requireManager } = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticateToken, getProjects);
router.get("/:id", authenticateToken, getProject);
router.post("/", authenticateToken, requireManager, createProject);
router.put("/:id", authenticateToken, requireManager, updateProject);
router.delete("/:id", authenticateToken, requireManager, deleteProject);

module.exports = router;
