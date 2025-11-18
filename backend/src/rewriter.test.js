const { rewriteText } = require('./rewriter');

describe('rewriteText', () => {
  // Test input validation
  describe('Input Validation', () => {
    test('should throw error for empty text', () => {
      expect(() => rewriteText('', 'friendly')).toThrow('Text must be a non-empty string');
    });

    test('should throw error for null text', () => {
      expect(() => rewriteText(null, 'friendly')).toThrow('Text must be a non-empty string');
    });

    test('should throw error for undefined text', () => {
      expect(() => rewriteText(undefined, 'friendly')).toThrow('Text must be a non-empty string');
    });

    test('should throw error for non-string text', () => {
      expect(() => rewriteText(123, 'friendly')).toThrow('Text must be a non-empty string');
    });

    test('should throw error for empty tone', () => {
      expect(() => rewriteText('Hello world', '')).toThrow('Tone must be a non-empty string');
    });

    test('should throw error for null tone', () => {
      expect(() => rewriteText('Hello world', null)).toThrow('Tone must be a non-empty string');
    });

    test('should throw error for unsupported tone', () => {
      expect(() => rewriteText('Hello world', 'angry')).toThrow('Unsupported tone');
    });
  });

  // Test friendly tone
  describe('Friendly Tone', () => {
    test('should rewrite text in friendly tone', () => {
      const text = 'I am writing to inform you about the meeting.';
      const result = rewriteText(text, 'friendly');
      expect(result).toContain("I'd love to");
      expect(result.toLowerCase()).toMatch(/(hi|hello|hey)/);
    });

    test('should handle case insensitive tone parameter', () => {
      const text = 'I need to discuss this matter.';
      const result = rewriteText(text, 'FRIENDLY');
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    test('should add friendly greeting', () => {
      const text = 'I need your help with the project.';
      const result = rewriteText(text, 'friendly');
      expect(result).toMatch(/^(Hi|Hello|Hey)/i);
    });

    test('should replace formal phrases with friendly ones', () => {
      const text = 'Please be advised that the deadline is tomorrow.';
      const result = rewriteText(text, 'friendly');
      expect(result.toLowerCase()).toContain('heads up');
    });

    test('should add friendly closing', () => {
      const text = 'We need to reschedule the meeting';
      const result = rewriteText(text, 'friendly');
      expect(result.toLowerCase()).toMatch(/(thanks|thank you|cheers)/);
    });
  });

  // Test professional tone
  describe('Professional Tone', () => {
    test('should rewrite text in professional tone', () => {
      const text = 'Hi there! Just wanted to let you know about the update.';
      const result = rewriteText(text, 'professional');
      expect(result).not.toContain('Hi there!');
      expect(result).toMatch(/(Dear|Good day)/i);
    });

    test('should add professional greeting', () => {
      const text = 'I need to discuss the quarterly results.';
      const result = rewriteText(text, 'professional');
      expect(result).toMatch(/^(Dear|Good day)/i);
    });

    test('should replace casual phrases with professional ones', () => {
      const text = 'Hey, just a heads up that the meeting is cancelled.';
      const result = rewriteText(text, 'professional');
      expect(result.toLowerCase()).toContain('advised');
    });

    test('should add professional closing', () => {
      const text = 'I will send you the report tomorrow';
      const result = rewriteText(text, 'professional');
      expect(result.toLowerCase()).toMatch(/(regards|sincerely|respectfully)/);
    });

    test('should handle whitespace in tone parameter', () => {
      const text = 'The project is complete.';
      const result = rewriteText(text, '  professional  ');
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });
  });

  // Test assertive tone
  describe('Assertive Tone', () => {
    test('should rewrite text in assertive tone', () => {
      const text = 'I think we should move forward with the plan.';
      const result = rewriteText(text, 'assertive');
      expect(result).not.toContain('I think');
      expect(result).toContain('I am confident');
    });

    test('should remove hedging language', () => {
      const text = 'I kind of think this is sort of important.';
      const result = rewriteText(text, 'assertive');
      expect(result).not.toContain('kind of');
      expect(result).not.toContain('sort of');
    });

    test('should make requests more direct', () => {
      const text = 'Could you please send me the report?';
      const result = rewriteText(text, 'assertive');
      expect(result).toContain('Please');
      expect(result).not.toContain('Could you');
    });

    test('should replace apologetic language', () => {
      const text = 'Sorry, but I need this by Friday.';
      const result = rewriteText(text, 'assertive');
      expect(result).not.toContain('Sorry');
      expect(result).toContain('Please note');
    });

    test('should ensure sentences end with period', () => {
      const text = 'I need the report by tomorrow';
      const result = rewriteText(text, 'assertive');
      expect(result).toMatch(/\.$/);
    });
  });

  // Test edge cases
  describe('Edge Cases', () => {
    test('should handle very short text', () => {
      const text = 'Hello';
      expect(() => rewriteText(text, 'friendly')).not.toThrow();
    });

    test('should handle text with multiple sentences', () => {
      const text = 'I need your help. This is urgent. Please respond soon.';
      const result = rewriteText(text, 'professional');
      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });

    test('should handle text with special characters', () => {
      const text = 'Hello! I need help with item #123 & task $45.';
      const result = rewriteText(text, 'friendly');
      expect(result).toBeTruthy();
    });
  });
});
