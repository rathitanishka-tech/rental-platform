const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  startMoveIn,
  getMoveIn,
  uploadDocuments,
  acceptAgreement,
  addChecklist
} = require("../controllers/moveinController");

router.post("/", protect, startMoveIn);
router.get("/", protect, getMoveIn);

router.put("/:id/documents", protect, uploadDocuments);
router.put("/:id/agreement", protect, acceptAgreement);
router.put("/:id/checklist", protect, addChecklist);

module.exports = router;