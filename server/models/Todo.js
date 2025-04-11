const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ['pending', 'completed', 'postponed'],
    default: 'pending'
  },
  dueDate: Date,
  notes: String,
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Todo', todoSchema);