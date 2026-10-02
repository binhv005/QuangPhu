const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Vui lòng nhập họ và tên'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Vui lòng nhập số điện thoại'],
    trim: true
  },
  serviceType: {
    type: String,
    enum: ['xe-nghi-truong', 'tuong-bac-ho', 'tuong-tho', 'qua-tang', 'cong-trinh-khac'],
    default: 'xe-nghi-truong'
  },
  requirement: {
    type: String,
    required: [true, 'Vui lòng nhập nội dung yêu cầu'],
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'quoted', 'completed', 'cancelled'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Consultation', ConsultationSchema);
