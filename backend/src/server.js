require('dotenv').config();
const express = require('express');
const path = require('path');
const { rewriteText } = require('./rewriter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend')));

app.post('/rewrite', async (req, res) => {
  try {
    const { text, tone } = req.body;
    if (!text || !tone) return res.status(400).json({ success: false, error: 'Text and tone required' });
    
    const rewrittenText = await rewriteText(text, tone);
    res.json({ success: true, rewrittenText });
  } catch (err) {
    res.status(err.message.includes('token') ? 500 : 400).json({ success: false, error: err.message });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`📧 Email Rewriter running on http://localhost:${PORT}`);
  console.log(`🔑 Token: ${process.env.GITHUB_TOKEN ? '✓' : '✗'}`);
});

module.exports = app;
