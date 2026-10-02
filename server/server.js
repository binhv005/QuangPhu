const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const Consultation = require('./models/Consultation');
const Project = require('./models/Project');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/quangphu_db';

// Middlewares
app.use(cors());
app.use(express.json());

// Serve uploaded / static assets
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
app.use('/assets/images', express.static(path.join(__dirname, '..', 'assets', 'images')));

// Initial Projects Seed Data
const initialProjects = [
  {
    title: 'Khối xe nghi trượng A05',
    category: 'ĐẠI LỄ QUỐC GIA',
    image: '/assets/images/xe-nghi-truong-main.jpg',
    description: 'Sản xuất khối xe nghi trượng phục vụ đại lễ cấp quốc gia A05-A80.',
    order: 1
  },
  {
    title: 'Tượng đài chiến thắng',
    category: 'CÔNG TRÌNH TƯỢNG ĐÀI',
    image: '/assets/images/tuong-dai-chien-thang.jpg',
    description: 'Thiết kế và đúc tượng đài nghệ thuật tôn vinh chiến thắng lịch sử.',
    order: 2
  },
  {
    title: 'Tượng Bác Hồ',
    category: 'TƯỢNG CHÂN DUNG',
    image: '/assets/images/tuong-bac-ho.jpg',
    description: 'Chế tác tượng chân dung Chủ tịch Hồ Chí Minh chuẩn mực thần thái.',
    order: 3
  },
  {
    title: 'Công trình di tích',
    category: 'DI TÍCH LỊCH SỬ',
    image: '/assets/images/cong-trinh-di-tich.jpg',
    description: 'Phục dựng và chế tác các hạng mục cơ khí mỹ thuật đền chùa di tích.',
    order: 4
  }
];

// Seed projects function
async function seedProjectsIfEmpty() {
  try {
    const count = await Project.countDocuments();
    if (count === 0) {
      await Project.insertMany(initialProjects);
      console.log('Seeded initial projects into MongoDB database.');
    }
  } catch (err) {
    console.error('Error seeding projects:', err.message);
  }
}

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB database:', MONGODB_URI);
    seedProjectsIfEmpty();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

// --- API ROUTES ---

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date(),
    service: 'Quang Phu Co Khi My Thuat API',
    mongoStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// GET /api/projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/consultations (Submit Quote Request)
app.post('/api/consultations', async (req, res) => {
  try {
    const { fullName, phone, serviceType, requirement } = req.body;

    if (!fullName || !phone || !requirement) {
      return res.status(400).json({
        success: false,
        error: 'Vui lòng điền đầy đủ Họ và tên, Số điện thoại và Nội dung yêu cầu.'
      });
    }

    const consultation = new Consultation({
      fullName,
      phone,
      serviceType: serviceType || 'xe-nghi-truong',
      requirement
    });

    await consultation.save();

    res.status(201).json({
      success: true,
      message: 'Gửi yêu cầu tư vấn thành công! Đội ngũ Quảng Phú sẽ liên hệ lại quý khách sớm nhất.',
      data: consultation
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET /api/consultations (Admin / Leads listing)
app.get('/api/consultations', async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ createdAt: -1 });
    res.json({ success: true, count: consultations.length, data: consultations });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/consultations/:id (Update status)
app.patch('/api/consultations/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!consultation) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy yêu cầu tư vấn' });
    }
    res.json({ success: true, data: consultation });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend Server is running on port ${PORT} (http://localhost:${PORT})`);
});
