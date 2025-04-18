const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// Import API routes
const contactRoutes = require('./api/contact');
const blogRoutes = require('./api/blog');

const app = express();
const PORT = process.env.SERVER_PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build')));

// API routes
app.use('/api/contact', contactRoutes);
app.use('/api/blog', blogRoutes);

// Serve the React app for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: {
      message: err.message || 'An unexpected error occurred',
      status: statusCode
    }
  });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  app.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
