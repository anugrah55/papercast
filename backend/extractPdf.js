const pdfParse = require('pdf-parse');

async function extractPdf(buffer) {
  const data = await pdfParse(buffer);
  let text = data.text;
  
  if (!text || text.trim().length < 200) {
    throw new Error("This PDF appears to be scanned or image-based. Please upload a text-based PDF.");
  }
  
  // Trim to first 200000 characters (enough for the whole paper with gpt-4o context window)
  if (text.length > 200000) {
    text = text.substring(0, 200000);
  }
  
  return text;
}

module.exports = { extractPdf };
