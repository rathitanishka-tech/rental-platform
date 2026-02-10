const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  requestVisit,
  getUserVisits,
  updateVisitStatus,
  getAllVisits
} = require("../controllers/visitController");

// ✅ TEST ROUTE
router.get("/test", (req, res) => {
  res.send("TEST WORKING");
});

// 👤 USER ROUTES
router.post("/", protect, requestVisit);
router.get("/", protect, getUserVisits);

// 🛠️ ADMIN ROUTE
router.get("/all", protect, authorize("admin"), getAllVisits);

// 🛠️ UPDATE VISIT
router.put("/:id", protect, authorize("admin"), updateVisitStatus);

module.exports = router;