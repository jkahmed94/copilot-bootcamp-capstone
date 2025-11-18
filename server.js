/**
 * Email Rewriter by Tone - Express Server
 * Provides an API endpoint to rewrite email text in different tones
 */

const express = require('express');
const path = require('path');
const { rewriteText } = require('./rewriter');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * POST /rewrite
 * Endpoint to rewrite email text based on specified tone
 * 
 * Request body:
 * {
 *   "text": "The email text to rewrite",
 *   "tone": "friendly | professional | assertive"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "rewrittenText": "The rewritten email text"
 * }
 * 
 * Error response:
 * {
 *   "success": false,
 *   "error": "Error message"
 * }
 */
app.post('/rewrite', (req, res) => {
  try {
    // Extract text and tone from request body
    const { text, tone } = req.body;

    // Validate request
    if (!text || !tone) {
      return res.status(400).json({
        success: false,
        error: 'Both text and tone are required'
      });
    }

    // Rewrite the text using the rewriteText function
    const rewrittenText = rewriteText(text, tone);

    // Send success response
    res.json({
      success: true,
      rewrittenText: rewrittenText
    });
  } catch (error) {
    // Handle errors from rewriteText function
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Email Rewriter API is running' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Email Rewriter server is running on http://localhost:${PORT}`);
  console.log(`Visit http://localhost:${PORT} to use the application`);
});

// Export app for testing purposes
module.exports = app;
