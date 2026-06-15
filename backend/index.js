require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { extractPdf } = require('./extractPdf');
const { generateScript } = require('./generateScript');
const { synthesizeAudio } = require('./synthesizeAudio');
const { generateFeature } = require('./generateFeature');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/generate', upload.single('pdf'), async (req, res) => {
  // Set timeout to 10 minutes
  req.setTimeout(600000);
  res.setTimeout(600000);
  try {
    const file = req.file;
    const tone = req.body.tone || 'casual';

    if (!file) {
      return res.status(400).json({ error: "Please upload a PDF file." });
    }

    const text = await extractPdf(file.buffer);
    const script = await generateScript(text, tone);
    const { audioBuffer, scriptWithTimestamps } = await synthesizeAudio(script);

    res.json({
      audioBase64: audioBuffer.toString('base64'),
      script: scriptWithTimestamps
    });
  } catch (error) {
    console.error("Error in /api/generate:", error);
    res.status(500).json({ error: error.message || "An unexpected error occurred." });
  }
});

app.post('/api/feature', upload.single('pdf'), async (req, res) => {
  req.setTimeout(300000);
  res.setTimeout(300000);
  try {
    const file = req.file;
    const featureType = req.body.featureType;
    const interest = req.body.interest || '';

    if (!file) {
      return res.status(400).json({ error: "Please upload a PDF file." });
    }
    if (!featureType) {
      return res.status(400).json({ error: "featureType is required." });
    }

    const text = await extractPdf(file.buffer);
    const result = await generateFeature(text, featureType, interest);
    
    res.json({ result });
  } catch (error) {
    console.error("Error in /api/feature:", error);
    res.status(500).json({ error: error.message || "An unexpected error occurred." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
