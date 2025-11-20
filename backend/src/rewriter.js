const VALID_TONES = ['friendly', 'professional', 'assertive'];

async function rewriteText(text, tone) {
  const t = text?.trim();
  const tn = tone?.toLowerCase().trim();

  if (!t) throw new Error('Text required');
  if (!tn || !VALID_TONES.includes(tn)) throw new Error(`Invalid tone. Use: ${VALID_TONES.join(', ')}`);

  // MVP: AI integration moved to Post-MVP
  return 'AI is not integrated yet. Your email will be rewritten here once AI integration is complete.'
}

module.exports = { rewriteText };
