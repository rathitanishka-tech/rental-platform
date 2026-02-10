const User = require("../models/User");
const Property = require("../models/Property");


exports.getShortlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("shortlist");
    res.json(user.shortlist);
  } catch (err) {
    res.status(500).json({ message: "Error fetching shortlist" });
  }
};


exports.addToShortlist = async (req, res) => {
  try {
    const { propertyId } = req.body;

    const user = await User.findById(req.user.id);

    if (!user.shortlist.includes(propertyId)) {
      user.shortlist.push(propertyId);
      await user.save();
    }

    res.json({ message: "Added to shortlist" });
  } catch (err) {
    res.status(500).json({ message: "Error adding to shortlist" });
  }
};

// REMOVE from shortlist
exports.removeFromShortlist = async (req, res) => {
  try {
    const { propertyId } = req.body;

    const user = await User.findById(req.user.id);

    user.shortlist = user.shortlist.filter(
      id => id.toString() !== propertyId
    );

    await user.save();

    res.json({ message: "Removed from shortlist" });
  } catch (err) {
    res.status(500).json({ message: "Error removing from shortlist" });
  }
};