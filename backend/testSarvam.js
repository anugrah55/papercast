const fs = require('fs');
async function test() {
  const apiKey = process.env.SARVAM_API_KEY;
  const response = await fetch('https://api.sarvam.ai/text-to-speech', {
    method: 'POST',
    headers: {
      'api-subscription-key': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: ["Hello world"],
      target_language_code: "en-IN",
      speaker: "shubh",
      model: "bulbul:v3"
    })
  });
  const data = await response.json();
  const buffer = Buffer.from(data.audios[0], 'base64');
  fs.writeFileSync('test.wav', buffer);
  console.log("File written");
}
test();
