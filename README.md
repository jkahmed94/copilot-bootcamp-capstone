# Email Rewriter by Tone 📧

AI-powered email rewriting using GitHub Models (GPT-4o).

## Features

- 😊 Friendly, 💼 Professional, 💪 Assertive tones
- Real-time AI rewriting via GPT-4o
- Clean UI, full test coverage

## Setup

```bash
git clone https://github.com/jkahmed94/copilot-bootcamp-capstone.git
cd copilot-bootcamp-capstone
npm install
```

Create `.env`:
```bash
GITHUB_TOKEN=your_token_here
```
Get token: https://github.com/settings/tokens (no scopes needed)

## Usage

```bash
npm start  # Run at http://localhost:3000
npm test   # Run tests
```

## Stack

- **AI**: GitHub Models GPT-4o
- **Backend**: Node.js, Express, OpenAI SDK
- **Frontend**: Vanilla JS
- **Tests**: Jest

## How It Works

1. User inputs email + selects tone
2. Frontend POST to `/rewrite`
3. Backend sends to GPT-4o with tone prompt
4. AI rewrites, returns result
5. Display rewritten email