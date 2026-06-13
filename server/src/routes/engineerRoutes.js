const express = require("express");
const { getEngineers, getEngineerCapacity } = require("../controllers/engineerController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticateToken, getEngineers);
router.get("/:id/capacity", authenticateToken, getEngineerCapacity);

module.exports = router;
