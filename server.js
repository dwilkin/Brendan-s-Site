require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Schema
const formSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  location: String,
  projectDetails: String,
  budget: String,
  createdAt: { type: Date, default: Date.now }
});

const Form = mongoose.model('Form', formSchema);

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// API Routes
app.post('/api/submit-form', async (req, res) => {
  try {
    const formData = req.body;
    
    // Save to MongoDB
    const newForm = new Form(formData);
    await newForm.save();

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'darian@wilkin.online',
      subject: 'New Sales Form Submission',
      html: `
        <h2>New Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Location:</strong> ${formData.location}</p>
        <p><strong>Project Details:</strong> ${formData.projectDetails}</p>
        <p><strong>Budget:</strong> ${formData.budget}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
      console.log(`Static files path: ${path.join(__dirname, 'client/build')}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err)); 