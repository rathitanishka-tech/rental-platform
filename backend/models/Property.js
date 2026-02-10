const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  images: [String],
  amenities: [String],
  images: [String],
  rules: [String],
  availableFrom: Date,
  status: {
    type: String,
    enum: ["draft", "review", "published"],
    default: "draft"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);