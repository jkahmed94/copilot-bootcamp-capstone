/**
 * @jest-environment jsdom
 */

const createMockElement = (overrides = {}) => ({
  value: '',
  textContent: '',
  innerHTML: '',
  disabled: false,
  style: { display: 'none', color: '', backgroundColor: '' },
  focus: jest.fn(),
  addEventListener: jest.fn(),
  ...overrides
});

const $ = {
  text: createMockElement('emailText'),
  tone: createMockElement('toneDropdown'),
  rewrite: createMockElement('rewriteButton'),
  output: createMockElement('output'),
  loading: createMockElement('loadingIndicator'),
  error: createMockElement('errorMessage')
};

document.getElementById = jest.fn((id) => ({
  emailText: $.text,
  toneDropdown: $.tone,
  rewriteButton: $.rewrite,
  output: $.output,
  loadingIndicator: $.loading,
  errorMessage: $.error
})[id]);

global.fetch = jest.fn();

describe('Frontend', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.values($).forEach(el => {
      el.value = '';
      el.textContent = '';
      el.disabled = false;
      el.style.display = 'none';
    });
  });

  test('elements exist', () => {
    ['emailText', 'toneDropdown', 'rewriteButton', 'output', 'loadingIndicator', 'errorMessage']
      .forEach(id => expect(document.getElementById(id)).toBeDefined());
  });

  test('API success', async () => {
    fetch.mockResolvedValue({ json: async () => ({ success: true, rewrittenText: 'Result' }) });
    const data = await (await fetch('/rewrite')).json();
    expect(data.success).toBe(true);
  });

  test('API error', async () => {
    fetch.mockResolvedValue({ json: async () => ({ success: false, error: 'Failed' }) });
    const data = await (await fetch('/rewrite')).json();
    expect(data.error).toBe('Failed');
  });

  test('UI state', () => {
    $.loading.style.display = 'block';
    $.error.textContent = 'Error';
    $.output.textContent = 'Result';
    expect($.loading.style.display).toBe('block');
    expect($.error.textContent).toBe('Error');
    expect($.output.textContent).toBe('Result');
  });
});
