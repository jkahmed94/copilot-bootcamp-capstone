/**
 * Rewrites the given text based on the specified tone
 * @param {string} text - The original text to rewrite
 * @param {string} tone - The desired tone (friendly, professional, assertive)
 * @returns {string} - The rewritten text
 */
function rewriteText(text, tone) {
  // Validate inputs
  if (!text || typeof text !== 'string') {
    throw new Error('Text must be a non-empty string');
  }
  
  if (!tone || typeof tone !== 'string') {
    throw new Error('Tone must be a non-empty string');
  }

  const normalizedTone = tone.toLowerCase().trim();
  
  // Define tone-specific transformations
  switch (normalizedTone) {
    case 'friendly':
      return rewriteFriendly(text);
    case 'professional':
      return rewriteProfessional(text);
    case 'assertive':
      return rewriteAssertive(text);
    default:
      throw new Error('Unsupported tone. Please use: friendly, professional, or assertive');
  }
}

/**
 * Rewrites text in a friendly tone
 * @param {string} text - The original text
 * @returns {string} - Text rewritten in a friendly tone
 */
function rewriteFriendly(text) {
  let rewritten = text;
  
  // Add friendly greetings if not present
  if (!rewritten.match(/^(hi|hello|hey)/i)) {
    rewritten = 'Hi there! ' + rewritten;
  }
  
  // Replace formal phrases with friendly ones
  rewritten = rewritten
    .replace(/\b(I am writing to|I wish to|I would like to)\b/gi, "I'd love to")
    .replace(/\b(please be advised|please note|kindly note)\b/gi, 'just a heads up')
    .replace(/\b(sincerely|regards|best regards)\b/gi, 'Cheers')
    .replace(/\b(however|nevertheless)\b/gi, 'but')
    .replace(/\b(therefore|thus|consequently)\b/gi, 'so');
  
  // Add friendly closing if not present
  if (!rewritten.match(/(thanks|thank you|cheers|best)/i)) {
    rewritten += ' Thanks so much!';
  }
  
  return rewritten;
}

/**
 * Rewrites text in a professional tone
 * @param {string} text - The original text
 * @returns {string} - Text rewritten in a professional tone
 */
function rewriteProfessional(text) {
  let rewritten = text;
  
  // Add professional greeting if not present
  if (!rewritten.match(/^(dear|hello|good morning|good afternoon)/i)) {
    rewritten = 'Dear recipient, ' + rewritten;
  }
  
  // Replace casual phrases with professional ones
  rewritten = rewritten
    .replace(/\b(hi there|hey|hi)\b/gi, 'Good day')
    .replace(/\b(I'd love to|I want to)\b/gi, 'I would like to')
    .replace(/\b(just a heads up|FYI)\b/gi, 'Please be advised')
    .replace(/\b(thanks so much|thanks)\b/gi, 'Thank you')
    .replace(/\b(cheers|best)\b/gi, 'Best regards')
    .replace(/\b(but)\b/gi, 'however')
    .replace(/\b(so)\b/gi, 'therefore');
  
  // Add professional closing if not present
  if (!rewritten.match(/(sincerely|regards|respectfully)/i)) {
    rewritten += ' Best regards.';
  }
  
  return rewritten;
}

/**
 * Rewrites text in an assertive tone
 * @param {string} text - The original text
 * @returns {string} - Text rewritten in an assertive tone
 */
function rewriteAssertive(text) {
  let rewritten = text;
  
  // Make statements more direct and assertive
  rewritten = rewritten
    .replace(/\b(I think|I believe|I feel|maybe|perhaps)\b/gi, 'I am confident')
    .replace(/\b(could you|would you|can you)\b/gi, 'Please')
    .replace(/\b(I would like to|I'd love to)\b/gi, 'I need to')
    .replace(/\b(if possible|if you can)\b/gi, 'as required')
    .replace(/\b(sorry|apologies)\b/gi, 'Please note')
    .replace(/\b(just a heads up|FYI)\b/gi, 'Be aware');
  
  // Remove hedging language
  rewritten = rewritten
    .replace(/\b(kind of|sort of|a bit)\b/gi, '')
    .replace(/\s+/g, ' ') // Clean up extra spaces
    .trim();
  
  // Ensure assertive closing
  if (!rewritten.match(/\.\s*$/)) {
    rewritten += '.';
  }
  
  return rewritten;
}

// Export the main function for use in other modules
module.exports = { rewriteText };
