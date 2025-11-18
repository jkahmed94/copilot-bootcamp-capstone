/**
 * Email Rewriter by Tone - Client-side JavaScript
 * Handles user interactions and API communication
 */

// DOM element references
const emailTextarea = document.getElementById('emailText');
const toneDropdown = document.getElementById('toneDropdown');
const rewriteButton = document.getElementById('rewriteButton');
const outputDiv = document.getElementById('output');
const copyButton = document.getElementById('copyButton');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');

/**
 * Main function to rewrite email text
 * Sends request to backend API and displays the result
 */
async function rewriteEmail() {
    // Get input values
    const text = emailTextarea.value.trim();
    const tone = toneDropdown.value;

    // Clear any previous error messages
    hideError();

    // Validate inputs
    if (!text) {
        showError('Please enter some email text to rewrite.');
        return;
    }

    if (!tone) {
        showError('Please select a tone for your email.');
        return;
    }

    // Show loading indicator and disable button
    showLoading();
    rewriteButton.disabled = true;
    copyButton.style.display = 'none';

    try {
        // Send POST request to the /rewrite endpoint
        const response = await fetch('/rewrite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, tone })
        });

        // Parse the JSON response
        const data = await response.json();

        // Hide loading indicator
        hideLoading();

        // Check if the request was successful
        if (data.success) {
            // Display the rewritten text
            displayOutput(data.rewrittenText);
        } else {
            // Show error message from the API
            showError(data.error || 'An error occurred while rewriting your email.');
        }
    } catch (error) {
        // Handle network or other errors
        hideLoading();
        showError('Failed to connect to the server. Please try again.');
        console.error('Error:', error);
    } finally {
        // Re-enable the rewrite button
        rewriteButton.disabled = false;
    }
}

/**
 * Display the rewritten text in the output section
 * @param {string} text - The rewritten email text
 */
function displayOutput(text) {
    outputDiv.textContent = text;
    outputDiv.style.color = '#333';
    copyButton.style.display = 'block';
}

/**
 * Copy the rewritten text to clipboard
 */
async function copyToClipboard() {
    const text = outputDiv.textContent;

    try {
        // Use the Clipboard API to copy text
        await navigator.clipboard.writeText(text);
        
        // Provide visual feedback
        const originalText = copyButton.textContent;
        copyButton.textContent = '✅ Copied!';
        copyButton.style.backgroundColor = '#218838';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            copyButton.textContent = originalText;
            copyButton.style.backgroundColor = '#28a745';
        }, 2000);
    } catch (error) {
        // Fallback for browsers that don't support Clipboard API
        showError('Failed to copy text. Please select and copy manually.');
        console.error('Copy error:', error);
    }
}

/**
 * Show loading indicator
 */
function showLoading() {
    loadingIndicator.style.display = 'block';
    outputDiv.innerHTML = '<div class="placeholder-text"><p>Processing...</p></div>';
}

/**
 * Hide loading indicator
 */
function hideLoading() {
    loadingIndicator.style.display = 'none';
}

/**
 * Show error message
 * @param {string} message - The error message to display
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    // Auto-hide error after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

/**
 * Hide error message
 */
function hideError() {
    errorMessage.style.display = 'none';
}

/**
 * Handle Enter key in textarea (Ctrl+Enter or Cmd+Enter to submit)
 * @param {KeyboardEvent} event - The keyboard event
 */
function handleTextareaKeypress(event) {
    // Submit on Ctrl+Enter or Cmd+Enter
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        rewriteEmail();
    }
}

// Event Listeners
rewriteButton.addEventListener('click', rewriteEmail);
copyButton.addEventListener('click', copyToClipboard);
emailTextarea.addEventListener('keydown', handleTextareaKeypress);

// Clear error when user starts typing or selecting
emailTextarea.addEventListener('input', hideError);
toneDropdown.addEventListener('change', hideError);

// Initialize - focus on textarea when page loads
window.addEventListener('DOMContentLoaded', () => {
    emailTextarea.focus();
});
