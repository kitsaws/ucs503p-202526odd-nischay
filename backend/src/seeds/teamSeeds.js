import mongoose from "mongoose";
import dotenv from "dotenv";
import Team from "../models/Team.js"; // adjust path if needed
import Event from "../models/Event.js"; // optional: only if you want to link existing events
import User from "../models/User.js";   // optional: only if you want valid user references

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/eventsDB";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

const teamNames = [
  "Code Titans",
  "AI Avengers",
  "Binary Beasts",
  "Dev Dynamos",
  "Algo Warriors",
  "Pixel Pioneers",
  "Cyber Ninjas",
  "Data Knights",
  "Hackstreet Boys",
  "Techno Tribe"
];

const sampleRoles = [
  ["Frontend Developer", "Backend Developer"],
  ["ML Engineer", "UI/UX Designer"],
  ["Full Stack Developer", "DevOps"],
  ["Data Scientist", "Research Analyst"],
  ["Web Developer", "Tester"],
  ["React Developer", "Node.js Developer"],
  ["AI Engineer", "Prompt Engineer"],
  ["Backend Developer", "Database Admin"],
  ["Designer", "Content Strategist"],
  ["App Developer", "Cloud Engineer"]
];

// Helper to create ObjectIds
const randomObjectId = () => new mongoose.Types.ObjectId();

const sampleTeams = teamNames.map((name, i) => ({
  eventId: randomObjectId(),  // Replace later with actual Event IDs if available
  teamName: name,
  teamSize: Math.floor(Math.random() * 5) + 2, // 2–6 members
  leaderId: randomObjectId(), // Replace later with actual User IDs if available
  members: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => randomObjectId()),
  rolesNeeded: sampleRoles[i],
  description: `We are ${name}, a passionate team aiming to innovate and build something great!`,
  requests: [
    {
      userId: randomObjectId(),
      status: "pending",
    },
  ],
}));

const seedTeams = async () => {
  try {
    await Team.deleteMany(); // optional: clear existing teams
    const createdTeams = await Team.insertMany(sampleTeams);
    // console.log(`${createdTeams.length} teams created successfully!`);
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
};

seedTeams();
