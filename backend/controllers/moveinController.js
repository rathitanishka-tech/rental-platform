const MoveIn = require("../models/MoveIn");

// ➕ Start move-in process
exports.startMoveIn = async (req, res) => {
  try {
    const moveIn = await MoveIn.create({
      userId: req.user.id,
      propertyId: req.body.propertyId
    });

    res.status(201).json(moveIn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Get user's move-in
exports.getMoveIn = async (req, res) => {
  try {
    const moveIn = await MoveIn.find({ userId: req.user.id })
      .populate("propertyId");

    res.json(moveIn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📎 Upload documents
exports.uploadDocuments = async (req, res) => {
  try {
    const moveIn = await MoveIn.findById(req.params.id);

    moveIn.documents.push(...req.body.documents);

    await moveIn.save();

    res.json(moveIn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✔️ Accept agreement
exports.acceptAgreement = async (req, res) => {
  try {
    const moveIn = await MoveIn.findById(req.params.id);

    moveIn.agreementAccepted = true;

    await moveIn.save();

    res.json(moveIn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📦 Add inventory checklist
exports.addChecklist = async (req, res) => {
  try {
    const moveIn = await MoveIn.findById(req.params.id);

    moveIn.inventoryChecklist.push(...req.body.items);

    await moveIn.save();

    res.json(moveIn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};