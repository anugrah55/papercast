# 🎙️ Papercast

Transform dense research papers into engaging, multi-speaker podcast episodes. 

Papercast is an AI-powered platform that parses PDFs and generates a realistic, conversational podcast between two synthetic hosts. It breaks down complex topics, extracts key insights, and delivers them in a format that is easy to listen to on the go.

![Hero Banner](./frontend/src/assets/hero.png)

## ✨ Features
- **PDF Parsing**: Instantly extracts text from any uploaded research paper.
- **Dynamic Script Generation**: Powered by **Google Gemini 2.0 Flash**, the script adapts to different tones (Casual, Technical, Hype, Simple, Humorous).
- **Interactive Deep Dives**: Select interactive features to explore topics further (e.g., "Explain using my interests", "Research to Hackathon Ideas").
- **Closed Captions**: Real-time, Spotify-style synced lyrics that highlight the active speaker.
- **Made with Sarvam AI & ElevenLabs**: High-quality voice synthesis for an incredibly realistic conversation.
- **Modern UI**: A premium, glassmorphic interface with animated ASCII hosts.

## 🛠️ Tech Stack
- **Frontend**: React + Vite + Vanilla CSS
- **Backend**: Node.js + Express
- **AI Models**: OpenAI, Sarvam AI API

## 🚀 Live Demo
- **Frontend**: Hosted on GitHub Pages
- **Backend**: Hosted on Render.com

---

## 💻 Local Development

### Prerequisites
- Node.js 18+
- API Keys for OpenAI, and Sarvam AI.

### 1. Setup the Backend
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```
2. Create a `.env` file in the `backend/` directory and add your keys:
   ```env
   OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
   ELEVENLABS_API_KEY=<YOUR_ELEVENLABS_API_KEY>
   ELEVENLABS_VOICE_A=7b9mYhmnp0y2qSH1FnBL
   ELEVENLABS_VOICE_B=BTNeCNdXniCSbjEac5vd
   PORT=3001
   GEMINI_API_KEY=<YOUR_GEMINI_API_KEY>
   SARVAM_API_KEY=<YOUR_SARVAM_API_KEY>
   ```
3. Start the server:
   ```bash
   npm start
   ```

### 2. Setup the Frontend
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```
2. Create a `.env` file in the `frontend/` directory to point to your backend:
   ```env
   VITE_API_URL=http://localhost:3001
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---
*Made in India, for the world, with Sarvam AI.*
