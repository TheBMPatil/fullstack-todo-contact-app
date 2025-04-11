const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ name: 1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a contact
router.post('/', async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    notes: req.body.notes
  });

  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update contact
router.patch('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (req.body.name) contact.name = req.body.name;
    if (req.body.email) contact.email = req.body.email;
    if (req.body.phone) contact.phone = req.body.phone;
    if (req.body.notes) contact.notes = req.body.notes;
    const updatedContact = await contact.save();
    res.json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete contact
router.delete('/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 