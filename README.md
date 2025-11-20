# Email Rewriter by Tone 📧

> Built with GitHub Copilot

Email rewriting application with tone selection (MVP: placeholder implementation, AI integration planned for Post-MVP).


## Features

- Supported tones: 😊 Friendly, 💼 Professional, 💪 Assertive, 🧢 Casual, 🏛️ Formal, 🤝 Empathetic, 🗣️ Persuasive
- Clean UI, full test coverage
- MVP: Returns placeholder message (AI integration in Post-MVP)

## Setup

```bash
git clone https://github.com/jkahmed94/copilot-bootcamp-capstone.git
cd copilot-bootcamp-capstone
npm install
```

## Usage

```bash
npm start  # Run at http://localhost:3000
npm test   # Run tests
```

## Stack

- **Backend**: Node.js, Express
- **Frontend**: Vanilla JS
- **Tests**: Jest

## How It Works

1. User inputs email + selects tone
2. Frontend POST to `/rewrite`
3. Backend validates and returns placeholder message
4. Display result (AI integration coming in Post-MVP)