const User = require("../models/Users");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.stauts(500).json({ error: "Failed to fetch" });
  }
};

const getUserPantry = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.stauts(404).json({ error: "No user found" });
    }
    res.json({ pantry: user.pantry });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Error getting user's pantry." });
  }
};

module.exports = { getAllUsers, getUserPantry };
