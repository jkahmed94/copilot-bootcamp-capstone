
require('dotenv').config();
const express = require('express');
const path = require('path');
const { rewriteText } = require('./rewriter');

/**
 * Express application for Email Rewriter API server.
 */
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend')));

/**
 * POST /rewrite
 * Rewrites the provided email text in the selected tone.
 * Request body: { text: string, tone: string }
 * Response: { success: boolean, rewrittenText?: string, error?: string }
 */
app.post('/rewrite', async (req, res) => {
  const { text, tone } = req.body;
  if (!text || !tone) {
    return res.status(400).json({ success: false, error: 'Text and tone required' });
  }
  // MVP: Return placeholder message (AI integration moved to Post-MVP)
  res.json({ success: true, rewrittenText: 'AI is not integrated yet. Your email will be rewritten here once AI integration is complete.' });
});

/**
 * GET /health
 * Health check endpoint.
 * Response: { status: 'ok' }
 */
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`📧 Email Rewriter running on http://localhost:${PORT}`);
});

module.exports = app;
