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

const deleteFood = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.decoded.username });

    if (!user) {
      return res.status(404).json({ status: "error", msg: "User not found" });
    }

    const foodId = req.params.foodId;
    user.pantry.pull({ _id: foodId });

    await user.save();

    res.json({ status: "ok", msg: "Food removed from user's pantry" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", msg: "Error deleting food" });
  }
};

const updateFood = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.decoded.username });

    if (!user) {
      return res.status(404).json({ status: "error", msg: "User not found" });
    }
    const foodItem = user.pantry.id(req.params.foodId);
    if (!foodItem) {
      return res
        .status(404)
        .json({ status: "error", msg: "Food item not found" });
    }

    foodItem.set(req.body);
    await user.save();
    res.json({ status: "ok", msg: "Food item updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", msg: "Error updating food" });
  }
};

module.exports = { createFood, getFood, deleteFood, updateFood };
