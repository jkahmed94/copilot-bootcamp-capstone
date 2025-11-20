
/**
 * Supported tone options for rewriting emails.
 * @type {string[]}
 */
const VALID_TONES = [
  'friendly',
  'professional',
  'assertive',
  'casual',
  'formal',
  'empathetic',
  'persuasive'
];


/**
 * Validates input and returns a placeholder rewritten email message.
 * @param {string} text - The original email text to rewrite.
 * @param {string} tone - The desired tone for rewriting.
 * @returns {Promise<string>} Placeholder rewritten email message.
 * @throws {Error} If text is empty or tone is invalid.
 */
async function rewriteText(text, tone) {
  const trimmedText = typeof text === 'string' ? text.trim() : '';
  const normalizedTone = typeof tone === 'string' ? tone.toLowerCase().trim() : '';

  if (!trimmedText) {
    throw new Error('Text required');
  }
  if (!normalizedTone || !VALID_TONES.includes(normalizedTone)) {
    throw new Error(`Invalid tone. Use: ${VALID_TONES.join(', ')}`);
  }

  // MVP: AI integration moved to Post-MVP
  return 'AI is not integrated yet. Your email will be rewritten here once AI integration is complete.';
}

module.exports = { rewriteText };
