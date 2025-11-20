require('dotenv').config();
const express = require('express');
const path = require('path');
const { rewriteText } = require('./rewriter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend')));

app.post('/rewrite', async (req, res) => {
  const { text, tone } = req.body;
  if (!text || !tone) return res.status(400).json({ success: false, error: 'Text and tone required' });
  
  // MVP: Return placeholder message (AI integration moved to Post-MVP)
  res.json({ success: true, rewrittenText: 'AI is not integrated yet. Your email will be rewritten here once AI integration is complete.' });
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`📧 Email Rewriter running on http://localhost:${PORT}`);
});

module.exports = app;
