const User = require("../models/User");
const Assignment = require("../models/Assignment");

const getUtilizationData = async (req, res) => {
  try {
    const engineers = await User.find({ role: "engineer" });
    const currentDate = new Date();

    const utilizationData = await Promise.all(
      engineers.map(async (engineer) => {
        const assignments = await Assignment.find({
          engineerId: engineer._id,
          startDate: { $lte: currentDate },
          endDate: { $gte: currentDate },
        });

        const currentAllocation = assignments.reduce((sum, assignment) => {
          return sum + assignment.allocationPercentage;
        }, 0);

        return {
          engineerId: engineer._id,
          name: engineer.name,
          maxCapacity: engineer.maxCapacity,
          currentAllocation,
          utilizationPercentage:
            (currentAllocation / engineer.maxCapacity) * 100,
        };
      })
    );

    res.json({ utilizationData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUtilizationData,
};
