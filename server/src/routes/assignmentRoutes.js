const express = require("express");
const {
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignmentController");
const { authenticateToken, requireManager } = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticateToken, getAssignments);
router.post("/", authenticateToken, requireManager, createAssignment);
router.put("/:id", authenticateToken, requireManager, updateAssignment);
router.delete("/:id", authenticateToken, requireManager, deleteAssignment);

module.exports = router;
