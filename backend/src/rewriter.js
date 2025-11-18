const { OpenAI } = require('openai');

const VALID_TONES = ['friendly', 'professional', 'assertive'];
const TONE_PROMPTS = {
  friendly: 'Rewrite in a warm, friendly tone.',
  professional: 'Rewrite in a formal, professional tone.',
  assertive: 'Rewrite in a direct, assertive tone.'
};

const client = new OpenAI({
  baseURL: 'https://models.github.ai', 
  apiKey: process.env.GITHUB_TOKEN,   
});

async function rewriteText(text, tone) {
  const t = text?.trim();
  const tn = tone?.toLowerCase().trim();

  if (!t) throw new Error('Text required');
  if (!tn || !VALID_TONES.includes(tn)) throw new Error(`Invalid tone. Use: ${VALID_TONES.join(', ')}`);
  if (!process.env.GITHUB_TOKEN || process.env.GITHUB_TOKEN === 'your_github_token_here') {
    throw new Error('GitHub token not configured');
  }

  try {
    const res = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: TONE_PROMPTS[tn] },
        { role: 'user', content: t }
      ],
      max_tokens: 500,
      temperature: 0.7
    });
    return res.choices[0].message.content.trim();
  } catch (err) {
    throw new Error(`Rewrite failed: ${err.message}`);
  }
}

module.exports = { rewriteText };
