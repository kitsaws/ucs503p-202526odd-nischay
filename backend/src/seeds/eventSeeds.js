import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "../models/Event.js"; // adjust the path if needed

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/SquadUp';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

const sampleEvents = [
  {
    title: "AI Hackathon 2025",
    description: "A 48-hour hackathon focused on AI and Machine Learning projects.",
    date: new Date("2025-11-20"),
    registrationLink: "https://aihackathon.com/register",
    category: "Hackathon",
    organizer: "MIT",
    createdBy: new mongoose.Types.ObjectId(),
  },
  {
    title: "Web Dev Workshop",
    description: "Hands-on workshop for building modern web applications using MERN stack.",
    date: new Date("2025-11-25"),
    registrationLink: "https://webdevworkshop.com/signup",
    category: "Workshop",
    organizer: "Stanford University",
    createdBy: new mongoose.Types.ObjectId(),
  },
  {
    title: "Coding Competition",
    description: "Compete with students worldwide in algorithm and data structure challenges.",
    date: new Date("2025-12-05"),
    registrationLink: "https://codingcomp.com/register",
    category: "Competition",
    organizer: "Harvard University",
    createdBy: new mongoose.Types.ObjectId(),
  },
  {
    title: "Tech Expo 2025",
    description: "Showcase innovative tech projects and network with industry experts.",
    date: new Date("2025-12-10"),
    registrationLink: "https://techexpo.com",
    category: "Other",
    organizer: "UC Berkeley",
    createdBy: new mongoose.Types.ObjectId(),
  },
  {
    title: "Blockchain Bootcamp",
    description: "Intensive 3-day bootcamp covering blockchain fundamentals and smart contracts.",
    date: new Date("2025-11-30"),
    registrationLink: "https://blockchainbootcamp.com/register",
    category: "Workshop",
    organizer: "University of Oxford",
    createdBy: new mongoose.Types.ObjectId(),
  },
  {
    title: "Cybersecurity Challenge",
    description: "Test your cybersecurity skills in this nationwide competition.",
    date: new Date("2025-12-15"),
    registrationLink: "https://cyberchallenge.com/signup",
    category: "Competition",
    organizer: "Imperial College London",
    createdBy: new mongoose.Types.ObjectId(),
  },
  {
    title: "Robotics Hackathon",
    description: "Design and build robots in a 48-hour competitive hackathon.",
    date: new Date("2025-11-28"),
    registrationLink: "https://roboticshackathon.com",
    category: "Hackathon",
    organizer: "ETH Zurich",
    createdBy: new mongoose.Types.ObjectId(),
  }
];

const seedEvents = async () => {
  try {
    await Event.deleteMany(); // optional: clear existing events
    const createdEvents = await Event.insertMany(sampleEvents);
    console.log(`${createdEvents.length} events created successfully!`);
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
};

seedEvents();
