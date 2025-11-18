# Email Rewriter by Tone 📧

A web application that rewrites email text in different tones (friendly, professional, or assertive) using Node.js, Express, and vanilla JavaScript.

## Features

- **Three Tone Options:**
  - 🙂 **Friendly**: Warm and approachable communication
  - 💼 **Professional**: Formal and polished business language
  - 💪 **Assertive**: Direct and confident messaging

- **Modern UI**: Clean, responsive design with gradient styling
- **Real-time Processing**: Instant email rewriting via REST API
- **Copy to Clipboard**: One-click copying of rewritten text
- **Error Handling**: Comprehensive validation and user feedback
- **Unit Tests**: Full test coverage with Jest

## Installation

1. Clone the repository:
```bash
git clone https://github.com/jkahmed94/copilot-bootcamp-capstone.git
cd copilot-bootcamp-capstone
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Running the Application

Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

### Running Tests

Run the Jest unit tests:
```bash
npm test
```

## API Documentation

### POST /rewrite

Rewrites email text based on the specified tone.

**Request Body:**
```json
{
  "text": "Your email text here",
  "tone": "friendly | professional | assertive"
}
```

**Success Response:**
```json
{
  "success": true,
  "rewrittenText": "Your rewritten email text"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Email Rewriter API is running"
}
```

## Project Structure

```
copilot-bootcamp-capstone/
├── server.js           # Express server with /rewrite endpoint
├── rewriter.js         # Core rewriting logic for different tones
├── rewriter.test.js    # Jest unit tests
├── package.json        # Project dependencies and scripts
├── public/             # Frontend files
│   ├── index.html      # Main HTML page
│   ├── styles.css      # Styling and responsive design
│   └── script.js       # Client-side JavaScript
└── README.md           # Documentation
```

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Testing**: Jest
- **Package Manager**: npm

## How It Works

1. User enters email text in the textarea
2. User selects desired tone from dropdown (friendly, professional, or assertive)
3. Click "Rewrite Email" button
4. Frontend sends POST request to `/rewrite` endpoint with text and tone
5. Backend `rewriteText()` function processes the text:
   - Validates inputs
   - Applies tone-specific transformations
   - Returns rewritten text
6. Frontend displays the result with copy-to-clipboard option

## Testing

The project includes comprehensive unit tests covering:
- Input validation
- All three tone transformations (friendly, professional, assertive)
- Edge cases and error handling
- Multiple test scenarios per tone

Run tests with: `npm test`

## License

ISC

## Author

Created for the GitHub Copilot Bootcamp Capstone Project