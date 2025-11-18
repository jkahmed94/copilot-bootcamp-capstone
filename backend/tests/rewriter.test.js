const mockCreate = jest.fn();

jest.mock('openai', () => ({
  OpenAI: jest.fn(() => ({
    chat: { completions: { create: mockCreate } }
  }))
}));

const { rewriteText } = require('../src/rewriter');

describe('Email Rewriter', () => {
  beforeEach(() => {
    process.env.GITHUB_TOKEN = 'test-token';
    mockCreate.mockClear();
  });

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

    test('rejects missing token', async () => {
      delete process.env.GITHUB_TOKEN;
      await expect(rewriteText('Hello', 'friendly')).rejects.toThrow('token');
    });

    test('rejects placeholder token', async () => {
      process.env.GITHUB_TOKEN = 'your_github_token_here';
      await expect(rewriteText('Hello', 'friendly')).rejects.toThrow('token');
    });
  });

  describe('API Integration', () => {
    ['friendly', 'professional', 'assertive'].forEach(tone => {
      test(`calls API with ${tone} tone`, async () => {
        mockCreate.mockResolvedValue({ choices: [{ message: { content: 'Result' } }] });
        await rewriteText('Test', tone);
        expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({
          model: 'gpt-4o',
          messages: expect.arrayContaining([expect.objectContaining({ role: 'system' })])
        }));
      });
    });

    test('handles case insensitive tone', async () => {
      mockCreate.mockResolvedValue({ choices: [{ message: { content: 'Result' } }] });
      await rewriteText('Test', 'FRIENDLY');
      expect(mockCreate).toHaveBeenCalled();
    });

    test('trims whitespace from response', async () => {
      mockCreate.mockResolvedValue({ choices: [{ message: { content: '  Result  ' } }] });
      const result = await rewriteText('Test', 'friendly');
      expect(result).toBe('Result');
    });
  });

  describe('Error Handling', () => {
    test('handles API errors', async () => {
      mockCreate.mockRejectedValue(new Error('API error'));
      await expect(rewriteText('Test', 'friendly')).rejects.toThrow();
    });
  });

  describe('Edge Cases', () => {
    test('trims whitespace', async () => {
      mockCreate.mockResolvedValue({ choices: [{ message: { content: '  Result  ' } }] });
      expect(await rewriteText('Test', 'friendly')).toBe('Result');
    });
  });
});
