const mongoose = require("mongoose");

const moveInSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
  },
  documents: [String],
  agreementAccepted: {
    type: Boolean,
    default: false
  },
  inventoryChecklist: [String],
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("MoveIn", moveInSchema);