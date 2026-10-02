const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
