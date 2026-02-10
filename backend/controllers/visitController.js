const Visit = require("../models/Visit");

// ➕ Request Visit
exports.requestVisit = async (req, res) => {
  try {
    const visits = await Visit.find({ userId: req.user.id })
  .populate("propertyId");

    res.status(201).json(visit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Get My Visits
exports.getUserVisits = async (req, res) => {
  try {
   const visits = await Visit.find({ user: req.user.id })
  .populate("propertyId");

    res.json(visits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin updates visit status
exports.updateVisitStatus = async (req, res) => {
  try {
    const { status, scheduledDate } = req.body;

    const allowedStatuses = ["requested", "scheduled", "visited", "decision"];

    // ✅ VALIDATION MUST BE INSIDE FUNCTION
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const visit = await Visit.findById(req.params.id);

    if (!visit) {
      return res.status(404).json({ message: "Visit not found" });
    }

    if (status) visit.status = status;
    if (scheduledDate) visit.scheduledDate = scheduledDate;

    await visit.save();

    res.json(visit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllVisits = async (req, res) => {
  try {
    const visits = await Visit.find()
      .populate("propertyId")
      .populate("userId");

    res.json(visits);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};