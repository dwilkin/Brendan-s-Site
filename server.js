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
  console.log('Received form submission:', req.body);
  
  try {
    const formData = req.body;
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.phone) {
      throw new Error('Required fields are missing');
    }

    // Save to MongoDB
    console.log('Saving to MongoDB...');
    const newForm = new Form(formData);
    await newForm.save();
    console.log('Saved to MongoDB successfully');

    // Send email
    console.log('Sending email...');
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
    console.log('Email sent successfully');
    
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error processing form submission:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Failed to submit form',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
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

// Connect to MongoDB with retry logic
const connectWithRetry = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Attempting to connect to MongoDB (attempt ${i + 1}/${retries})...`);
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB successfully');
      return;
    } catch (error) {
      console.error(`MongoDB connection attempt ${i + 1} failed:`, error);
      if (i < retries - 1) {
        console.log(`Retrying in ${delay/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
};

// Start the server
connectWithRetry()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
      console.log(`Static files path: ${path.join(__dirname, 'client/build')}`);
      console.log(`MongoDB URI: ${process.env.MONGODB_URI}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB after retries:', err);
    process.exit(1);
  }); 