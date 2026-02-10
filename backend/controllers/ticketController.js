const Ticket = require("../models/Ticket");

// ➕ Create ticket
exports.createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create({
      userId: req.user.id,
      subject: req.body.subject,
      messages: [
        {
          senderId: req.user.id,
          message: req.body.message
        }
      ]
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Get user tickets
exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user.id });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 💬 Add message
exports.addMessage = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    ticket.messages.push({
      senderId: req.user.id,
      message: req.body.message
    });

    await ticket.save();

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};