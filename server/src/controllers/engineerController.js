const User = require("../models/User");
const Assignment = require("../models/Assignment");

const getAvailableCapacity = async (engineerId, startDate, endDate) => {
  try {
    const engineer = await User.findById(engineerId);
    if (!engineer) return 0;

    const overlappingAssignments = await Assignment.find({
      engineerId,
      $or: [
        {
          startDate: { $lte: endDate },
          endDate: { $gte: startDate },
        },
      ],
    });

    const totalAllocated = overlappingAssignments.reduce((sum, assignment) => {
      return sum + assignment.allocationPercentage;
    }, 0);

    return Math.max(0, engineer.maxCapacity - totalAllocated);
  } catch (error) {
    console.error("Error calculating available capacity:", error);
    return 0;
  }
};

const getEngineers = async (req, res) => {
  try {
    const engineers = await User.find({ role: "engineer" }).select("-password");

    const engineersWithCapacity = await Promise.all(
      engineers.map(async (engineer) => {
        const currentDate = new Date();
        const futureDate = new Date();
        futureDate.setMonth(currentDate.getMonth() + 1);

        const availableCapacity = await getAvailableCapacity(
          engineer._id,
          currentDate,
          futureDate
        );

        return {
          ...engineer.toObject(),
          availableCapacity,
          currentAllocation: engineer.maxCapacity - availableCapacity,
        };
      })
    );

    res.json({ engineers: engineersWithCapacity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEngineerCapacity = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.query;

    const availableCapacity = await getAvailableCapacity(
      id,
      new Date(startDate),
      new Date(endDate)
    );

    res.json({ availableCapacity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getEngineers,
  getEngineerCapacity,
  getAvailableCapacity,
};
