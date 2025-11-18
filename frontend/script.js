const $ = {
  text: document.getElementById('emailText'),
  tone: document.getElementById('toneDropdown'),
  rewrite: document.getElementById('rewriteButton'),
  output: document.getElementById('output'),
  loading: document.getElementById('loadingIndicator'),
  error: document.getElementById('errorMessage')
};

async function rewriteEmail() {
  const text = $.text.value.trim();
  const tone = $.tone.value;

  hideError();
  if (!text) return showError('Enter email text');
  if (!tone) return showError('Select a tone');

  setLoading(true);

  try {
    const res = await fetch('/rewrite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, tone })
    });
    const data = await res.json();
    
    data.success 
      ? ($.output.textContent = data.rewrittenText, $.output.style.color = '#333')
      : showError(data.error || 'Rewrite failed');
  } catch {
    showError('Connection failed');
  } finally {
    setLoading(false);
  }
}

function setLoading(loading) {
  $.loading.style.display = loading ? 'block' : 'none';
  $.rewrite.disabled = loading;
  if (loading) $.output.innerHTML = '<div class="placeholder-text"><p>Processing...</p></div>';
}

function showError(msg) {
  $.error.textContent = msg;
  $.error.style.display = 'block';
  setTimeout(hideError, 5000);
}

function hideError() {
  $.error.style.display = 'none';
}

function handleKeypress(e) {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    rewriteEmail();
  }
}

$.rewrite.addEventListener('click', rewriteEmail);
$.text.addEventListener('keydown', handleKeypress);
$.text.addEventListener('input', hideError);
$.tone.addEventListener('change', hideError);

window.addEventListener('DOMContentLoaded', () => $.text.focus());
