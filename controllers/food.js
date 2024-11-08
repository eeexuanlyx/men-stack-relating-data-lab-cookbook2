const User = require("../models/Users");

const createFood = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.decoded.username });

    if (!user) {
      return res.status(404).json({ status: "error", msg: "User not found" });
    }

    const food = { name: req.body.name };

    user.pantry.push(food);
    await user.save();

    res.json({ status: "ok", msg: "Food added to user's pantry" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "error", msg: "An error occurred while adding food" });
  }
};

const getFood = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.decoded.username });

    if (!user) {
      return res.status(404).json({ status: "error", msg: "User not found" });
    }

    res.json({ pantry: user.pantry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", msg: "Error getting user pantry" });
  }
};

module.exports = { createFood, getFood };
