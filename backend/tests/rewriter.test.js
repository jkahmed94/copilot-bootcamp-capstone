const { rewriteText } = require('../src/rewriter');

describe('Email Rewriter MVP', () => {
  describe('Validation', () => {
    const cases = [
      ['', 'friendly'], ['   ', 'friendly'], [null, 'friendly'], [123, 'friendly'],
      ['Hello', ''], ['Hello', null], ['Hello', 'angry']
    ];

    cases.forEach(([text, tone]) => {
      test(`rejects invalid input`, async () => {
        await expect(rewriteText(text, tone)).rejects.toThrow();
      });
    });
  });

  describe('Placeholder Response', () => {
    ['friendly', 'professional', 'assertive'].forEach(tone => {
      test(`returns placeholder for ${tone} tone`, async () => {
        const result = await rewriteText('Test email', tone);
        expect(result).toContain('AI is not integrated yet');
      });
    });

    test('handles case insensitive tone', async () => {
      const result = await rewriteText('Test', 'FRIENDLY');
      expect(result).toContain('AI is not integrated yet');
    });
  });
});
