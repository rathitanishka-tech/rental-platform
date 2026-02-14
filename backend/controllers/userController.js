const User = require("../models/User");

// GET SAVED
exports.getShortlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("shortlist");

    res.json(user.shortlist);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching shortlist" });
  }
};

// ADD TO SAVED
exports.addToShortlist = async (req, res) => {
  try {
    const { propertyId } = req.body;

    if (!propertyId) {
      return res.status(400).json({ message: "Property ID missing" });
    }

    const user = await User.findById(req.user.id);

    // prevent duplicates
    if (!user.shortlist.includes(propertyId)) {
      user.shortlist.push(propertyId);
      await user.save();
    }

    res.json({ message: "Added to shortlist" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding to shortlist" });
  }
};

// REMOVE
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
    console.log(err);
    res.status(500).json({ message: "Error removing from shortlist" });
  }
};