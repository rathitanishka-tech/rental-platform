const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getShortlist,
  addToShortlist,
  removeFromShortlist
} = require("../controllers/userController");

router.get("/shortlist", protect, getShortlist);

router.post("/shortlist", protect, addToShortlist);

router.delete("/shortlist", protect, removeFromShortlist);

module.exports = router;