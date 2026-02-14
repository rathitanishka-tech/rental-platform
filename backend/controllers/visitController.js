const Visit = require("../models/Visit");

// ➕ Request Visit
exports.requestVisit = async (req, res) => {
  try {
    console.log("BODY:", req.body);     
    console.log("USER:", req.user);     

    const { propertyId } = req.body;

    if (!propertyId) {
      return res.status(400).json({ message: "Property ID missing" });
    }

    const visit = await Visit.create({
      userId: req.user.id,
      propertyId
    });

    res.status(201).json(visit);
  } catch (err) {
    console.log("VISIT ERROR FULL:", err); // 👈 IMPORTANT
    res.status(500).json({ message: "Error requesting visit" });
  }
};

// 📄 Get My Visits
exports.getUserVisits = async (req, res) => {
  try {
   const visits = await Visit.find({ userId: req.user.id })
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