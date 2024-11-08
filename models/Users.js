const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  name: { type: String, require: true },
});

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    pantry: [FoodSchema],
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
