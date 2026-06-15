# Papercast

Convert research papers (uploaded as PDFs) into AI-generated podcast episodes with two synthetic hosts.

## Stack
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **PDF parsing**: `pdf-parse`
- **Script generation**: Google Gemini 2.0 Flash API
- **Voice synthesis**: ElevenLabs TTS API

## Prerequisites
- Node.js 18+
- A Gemini API key (free at [aistudio.google.com](https://aistudio.google.com))
- An ElevenLabs API key

## Setup

1. Clone or download this repository.
2. Fill in the `.env` file in the `backend/` directory:
   ```env
   OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
   ELEVENLABS_API_KEY=<YOUR_ELEVENLABS_API_KEY>
   ELEVENLABS_VOICE_A=7b9mYhmnp0y2qSH1FnBL
   ELEVENLABS_VOICE_B=BTNeCNdXniCSbjEac5vd
   PORT=3001
   GEMINI_API_KEY=<YOUR_GEMINI_API_KEY>
   SARVAM_API_KEY=<YOUR_SARVAM_API_KEY>
   ```
   *(Note: You can find free ElevenLabs voice IDs at [elevenlabs.io/voice-library](https://elevenlabs.io/voice-library))*

## Running the Application

### 1. Backend
Open a terminal and run:
```bash
cd backend
npm install
node index.js
```
The backend will start on port `3001`.

### 2. Frontend
Open another terminal and run:
```bash
cd frontend
npm install
npm run dev
```
Open the provided local URL (e.g. `http://localhost:5173`) in your browser.
