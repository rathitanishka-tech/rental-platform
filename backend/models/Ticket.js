const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  subject: String,
  messages: [
    {
      senderId: mongoose.Schema.Types.ObjectId,
      message: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open"
  }
}, { timestamps: true });

module.exports = mongoose.model("Ticket", ticketSchema);