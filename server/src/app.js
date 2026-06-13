const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const engineerRoutes = require("./routes/engineerRoutes");
const projectRoutes = require("./routes/projectRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const seedRoutes = require("./routes/seedRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/engineers", engineerRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/seed", seedRoutes);

module.exports = app;
