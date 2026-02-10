const Property = require("../models/Property");

// ➕ Add Property (Admin)
exports.createProperty = async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Get All Properties (Tenant)
exports.getProperties = async (req, res) => {
  try {
    const { location, minPrice, maxPrice } = req.query;

    let filter = {};

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (minPrice && maxPrice) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }

    const properties = await Property.find(filter);

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET single property
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};