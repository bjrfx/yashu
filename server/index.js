const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// Import API routes
const contactRoutes = require('./api/contact');
const blogRoutes = require('./api/blog');

const app = express();
const PORT = process.env.SERVER_PORT || 8000;

// Define the build path properly using absolute paths
const BUILD_PATH = path.resolve(__dirname, '../build');
const INDEX_HTML_PATH = path.resolve(BUILD_PATH, 'index.html');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the build folder
app.use(express.static(BUILD_PATH));

// API routes
app.use('/api/contact', contactRoutes);
app.use('/api/blog', blogRoutes);

// Serve the React app for any other requests
app.get('*', (req, res) => {
  res.sendFile(INDEX_HTML_PATH);
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
  console.log(`Serving static files from: ${BUILD_PATH}`);
  console.log(`Serving index.html for client routes from: ${INDEX_HTML_PATH}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  app.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
