const express = require("express");
const { createFood, getFood } = require("../controllers/food");
const isSignedIn = require("../middleware/is-signed-in");
const router = express.Router();

router.post("/", isSignedIn, createFood);
router.get("/", isSignedIn, getFood);

module.exports = router;
