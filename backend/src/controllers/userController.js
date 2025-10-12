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
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
