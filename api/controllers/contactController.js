const Contact = require("../models/Contact");

// POST: Create contact
const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        message: "Name and phone are required",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET: Fetch all contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE: Remove contact
const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({
      message: "Contact deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createContact,
  getContacts,
  deleteContact,
};
