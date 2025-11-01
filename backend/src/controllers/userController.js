const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Google Login / Signup
exports.googleLogin = async (req, res) => {
  const { tokenId, name, email, university } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, university });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get logged-in user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user and populate all reference fields
    const user = await User.findById(id)
      .populate({
        path: 'teams',               // populate user's teams
        select: 'teamName eventId leaderId',  // only include these fields from Team
        populate: {
          path: 'eventId',
          select: 'title'
        }
      })
      .populate('socials');     // if socials are stored in a separate collection

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// Upload resume
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, { resource_type: 'auto' });

    const user = await User.findByIdAndUpdate(req.user.id, { resume_url: result.secure_url }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user info
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      fullName,
      email,
      university,
      branch,
      year,
      bio,
      skills,
      resumeUrl,
      profilePic,
      socials,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update fields if provided
    if (fullName !== undefined) user.name = fullName;
    if (email !== undefined) user.email = email;
    if (university !== undefined) user.university = university;
    if (branch !== undefined) user.branch = branch;
    if (year !== undefined) user.year = year;
    if (bio !== undefined) user.bio = bio;
    if (resumeUrl !== undefined) user.resumeUrl = resumeUrl;
    if (profilePic !== undefined) user.profilePic = profilePic;

    // Ensure skills is an array (in case frontend sends comma-separated string)
    if (skills !== undefined) {
      if (typeof skills === "string") {
        user.skills = skills.split(",").map((s) => s.trim()).filter(Boolean);
      } else if (Array.isArray(skills)) {
        user.skills = skills;
      }
    }

    // Handle socials update (only LinkedIn and GitHub editable)
    if (socials !== undefined && typeof socials === "object") {
      user.socials.linkedin = socials.linkedin || user.socials.linkedin || "";
      user.socials.github = socials.github || user.socials.github || "";

      // Preserve email inside socials (always synced to main email)
      user.socials.email = user.email;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(400).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};
