const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String },
  university: { type: String },
  year: { type: String },
  branch: { type: String },
  bio: { type: String, default: "" },
  skills: { type: [String], default: [] },
  resumeUrl: { type: String },
  profilePic: { type: String },
  role: { type: String, enum: ["student", "organizer"], default: "student" },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
  socials: {
    email: { type: String, default: function () { return this.email; } },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" }
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);