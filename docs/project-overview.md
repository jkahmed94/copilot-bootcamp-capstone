# Project Overview

## Introduction

Email Rewriter by Tone is a web application that transforms email content to match different communication styles. Choose from three tones (Friendly 😊, Professional 💼, Assertive 💪) to craft the perfect message.

The current MVP includes a fully functional UI with validation, error handling, and complete test coverage. AI integration is planned for post-MVP.

## Architecture

The project follows a monorepo architecture with the following structure:

- `frontend/`: Vanilla JavaScript web application
- `backend/`: Express.js API server

## Technology Stack

### Frontend

- HTML5, CSS3, Vanilla JavaScript
- Fetch API for HTTP requests
- Jest for testing

### Backend

- Node.js + Express.js
- dotenv for environment configuration
- Jest for testing
- (Post-MVP) AI Integration

## Development Workflow

### Running the Application

- **Start server:** `npm start` - Launches the Express server on port 3000
- **Access app:** Navigate to `http://localhost:3000` in your browser
- **Health check:** Visit `http://localhost:3000/health` to verify server status

### Testing

The project includes comprehensive test coverage for both frontend and backend:

- **Run all tests:** `npm test`
- **Run backend tests only:** `npm test:backend`
- **Run frontend tests only:** `npm test:frontend`

**Test Files:**
- `backend/tests/rewriter.test.js` - Tests for rewriting logic
- `frontend/tests/script.test.js` - Tests for frontend functionality

