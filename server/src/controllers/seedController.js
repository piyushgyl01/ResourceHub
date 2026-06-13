const User = require("../models/User");
const Project = require("../models/Project");
const Assignment = require("../models/Assignment");
const bcrypt = require("bcryptjs");

const seedData = async (req, res) => {
  try {
    await User.deleteMany({});
    await Project.deleteMany({});
    await Assignment.deleteMany({});

    const hashedPassword = await bcrypt.hash("password123", 10);

    const users = await User.insertMany([
      {
        email: "manager@company.com",
        name: "Sarah Johnson",
        password: hashedPassword,
        role: "manager",
        department: "Engineering",
      },
      {
        email: "john@company.com",
        name: "John Doe",
        password: hashedPassword,
        role: "engineer",
        skills: ["React", "Node.js", "JavaScript", "MongoDB"],
        seniority: "senior",
        maxCapacity: 100,
        department: "Frontend",
      },
      {
        email: "alice@company.com",
        name: "Alice Smith",
        password: hashedPassword,
        role: "engineer",
        skills: ["Python", "Django", "PostgreSQL", "Docker"],
        seniority: "mid",
        maxCapacity: 100,
        department: "Backend",
      },
      {
        email: "bob@company.com",
        name: "Bob Wilson",
        password: hashedPassword,
        role: "engineer",
        skills: ["React", "TypeScript", "Next.js", "GraphQL"],
        seniority: "junior",
        maxCapacity: 50,
        department: "Frontend",
      },
    ]);

    const manager = users.find((u) => u.role === "manager");

    const projects = await Project.insertMany([
      {
        name: "E-commerce Platform",
        description: "Build a modern e-commerce platform with React and Node.js",
        startDate: new Date("2025-06-01"),
        endDate: new Date("2025-09-30"),
        requiredSkills: ["React", "Node.js", "MongoDB"],
        teamSize: 3,
        status: "active",
        managerId: manager._id,
      },
      {
        name: "Mobile App Backend",
        description: "REST API for mobile application",
        startDate: new Date("2025-07-01"),
        endDate: new Date("2025-10-15"),
        requiredSkills: ["Python", "Django", "PostgreSQL"],
        teamSize: 2,
        status: "planning",
        managerId: manager._id,
      },
      {
        name: "Dashboard Analytics",
        description: "Real-time analytics dashboard",
        startDate: new Date("2025-06-15"),
        endDate: new Date("2025-08-30"),
        requiredSkills: ["TypeScript", "React", "D3.js"],
        teamSize: 2,
        status: "active",
        managerId: manager._id,
      },
    ]);

    const engineers = users.filter((u) => u.role === "engineer");
    await Assignment.insertMany([
      {
        engineerId: engineers[0]._id,
        projectId: projects[0]._id,
        allocationPercentage: 60,
        startDate: new Date("2025-06-01"),
        endDate: new Date("2025-09-30"),
        role: "Tech Lead",
      },
      {
        engineerId: engineers[1]._id,
        projectId: projects[1]._id,
        allocationPercentage: 80,
        startDate: new Date("2025-07-01"),
        endDate: new Date("2025-10-15"),
        role: "Backend Developer",
      },
      {
        engineerId: engineers[2]._id,
        projectId: projects[2]._id,
        allocationPercentage: 40,
        startDate: new Date("2025-06-15"),
        endDate: new Date("2025-08-30"),
        role: "Frontend Developer",
      },
    ]);

    res.json({ message: "Sample data created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  seedData,
};
