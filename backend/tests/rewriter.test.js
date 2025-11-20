
const { rewriteText } = require('../src/rewriter');

describe('Email Rewriter MVP', () => {
  describe('Validation', () => {
    const invalidCases = [
      ['', 'friendly'],
      ['   ', 'friendly'],
      [null, 'friendly'],
      [123, 'friendly'],
      ['Hello', ''],
      ['Hello', null],
      ['Hello', 'angry'],
      ['Hello', '123'],
      ['Hello', undefined],
      [undefined, 'friendly'],
      [{}, 'friendly'],
      ['Hello', {}],
    ];

    invalidCases.forEach(([text, tone]) => {
      test(`rejects invalid input: text=${JSON.stringify(text)}, tone=${JSON.stringify(tone)}`, async () => {
        await expect(rewriteText(text, tone)).rejects.toThrow();
      });
    });

    test('throws correct error for missing text', async () => {
      await expect(rewriteText('', 'friendly')).rejects.toThrow('Text required');
    });

    test('throws correct error for invalid tone', async () => {
      await expect(rewriteText('Hello', 'angry')).rejects.toThrow('Invalid tone');
    });
  });

  describe('Placeholder Response', () => {
    const validTones = [
      'friendly',
      'professional',
      'assertive',
      'casual',
      'formal',
      'empathetic',
      'persuasive'
    ];

    validTones.forEach(tone => {
      test(`returns placeholder for ${tone} tone`, async () => {
        const result = await rewriteText('Test email', tone);
        expect(result).toContain('AI is not integrated yet');
      });
    });

    test('handles case insensitive tone', async () => {
      const result = await rewriteText('Test', 'FRIENDLY');
      expect(result).toContain('AI is not integrated yet');
    });

    test('trims whitespace from tone', async () => {
      const result = await rewriteText('Test', '  friendly  ');
      expect(result).toContain('AI is not integrated yet');
    });

    test('trims whitespace from text', async () => {
      const result = await rewriteText('   Test   ', 'friendly');
      expect(result).toContain('AI is not integrated yet');
    });
  });
});
