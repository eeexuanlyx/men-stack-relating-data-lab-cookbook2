const express = require("express");
const { getAllUsers, getUserPantry } = require("../controllers/user");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId", getUserPantry);

module.exports = router;
