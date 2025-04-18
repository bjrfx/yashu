const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// In-memory storage for form submissions (for development purposes)
const contactSubmissions = [];

// Middleware to validate contact form submission
const validateContactForm = (req, res, next) => {
  const { name, email, subject, message, inquiryType } = req.body;
  
  // Check for required fields
  if (!name || !email || !subject || !message || !inquiryType) {
    return res.status(400).json({
      error: {
        message: 'All fields are required',
        status: 400
      }
    });
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: {
        message: 'Please provide a valid email address',
        status: 400
      }
    });
  }
  
  // If all validations pass, proceed
  next();
};

// Contact form submission endpoint
router.post('/', validateContactForm, async (req, res) => {
  try {
    const { name, email, subject, message, inquiryType } = req.body;
    
    // Store submission in memory
    const submission = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      inquiryType,
      date: new Date().toISOString(),
    };
    
    contactSubmissions.push(submission);
    
    // Get API key from environment
    const emailApiKey = process.env.EMAIL_API_KEY || '';
    
    // If email sending is enabled and we have an API key
    if (emailApiKey) {
      // Configure email transporter (this would be replaced with actual provider)
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER || 'contact@actressportfolio.com',
          pass: emailApiKey
        }
      });
      
      // Configure email message
      const mailOptions = {
        from: 'website@actressportfolio.com',
        to: 'contact@actressportfolio.com',
        replyTo: email,
        subject: `[Website Contact] ${subject} (${inquiryType})`,
        text: `Name: ${name}\nEmail: ${email}\nInquiry Type: ${inquiryType}\n\nMessage:\n${message}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `
      };
      
      // Send email (commented out since we don't have actual credentials)
      // await transporter.sendMail(mailOptions);
      console.log('Contact form submission would send email in production');
    }
    
    // Log submission
    console.log('New contact form submission:', submission.id);
    
    // Send success response
    res.status(200).json({
      success: true,
      message: 'Your message has been received. Thank you for reaching out!',
      submissionId: submission.id
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      error: {
        message: 'There was a problem sending your message. Please try again later.',
        status: 500
      }
    });
  }
});

// Get all submissions (for admin purposes, would require authentication in production)
router.get('/', (req, res) => {
  res.json(contactSubmissions);
});

module.exports = router;
