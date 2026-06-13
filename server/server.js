// server.js - Main Express server entry point
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

// Connect to Database
connectDB();

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
