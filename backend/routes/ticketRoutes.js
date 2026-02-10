const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createTicket,
  getTickets,
  addMessage
} = require("../controllers/ticketController");

router.post("/", protect, createTicket);
router.get("/", protect, getTickets);
router.put("/:id/message", protect, addMessage);

module.exports = router;