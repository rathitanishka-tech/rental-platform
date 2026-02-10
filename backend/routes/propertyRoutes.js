const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createProperty,
  getProperties
} = require("../controllers/propertyController");

// Admin adds property
router.post("/", protect, createProperty);

// Public / logged-in users fetch properties


module.exports = router;
const {  getPropertyById } = require("../controllers/propertyController");

router.get("/", getProperties);
router.get("/:id", getPropertyById);

const authorize = require("../middleware/roleMiddleware");
router.post("/", protect, authorize("admin"), createProperty);