const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    engineerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ermUser",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ermProject",
      required: true,
    },
    allocationPercentage: { type: Number, required: true, min: 0, max: 100 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    role: { type: String, default: "Developer" }, // Developer, Tech Lead, etc.
  },
  { timestamps: true }
);

module.exports = mongoose.model("ermAssignment", assignmentSchema);
