const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
  },
  status: {
    type: String,
    enum: ["requested", "scheduled", "visited", "decision"],
    default: "requested"
  },
  scheduledDate: Date
}, { timestamps: true });

module.exports = mongoose.model("Visit", visitSchema);