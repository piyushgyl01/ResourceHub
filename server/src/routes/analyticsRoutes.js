const express = require("express");
const { getUtilizationData } = require("../controllers/analyticsController");
const { authenticateToken, requireManager } = require("../middleware/auth");

const router = express.Router();

router.get("/utilization", authenticateToken, requireManager, getUtilizationData);

module.exports = router;
