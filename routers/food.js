const express = require("express");
const {
  createFood,
  getFood,
  deleteFood,
  updateFood,
} = require("../controllers/food");
const isSignedIn = require("../middleware/is-signed-in");
const router = express.Router();

router.post("/", isSignedIn, createFood);
router.get("/", isSignedIn, getFood);
router.delete("/:foodId", isSignedIn, deleteFood);
router.post("/:foodId", isSignedIn, updateFood);

module.exports = router;
