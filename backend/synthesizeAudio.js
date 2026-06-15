function mergeWavBuffers(buffers) {
  if (buffers.length === 0) return Buffer.alloc(0);
  if (buffers.length === 1) return buffers[0];

  let totalDataLength = 0;
  for (const buf of buffers) {
    // Basic validation: ensure it's at least 44 bytes (a valid WAV header)
    if (buf.length >= 44) {
      totalDataLength += buf.length - 44;
    }
  }

  const mergedBuffer = Buffer.alloc(44 + totalDataLength);

  // Copy the header from the first buffer
  buffers[0].copy(mergedBuffer, 0, 0, 44);

  // Update the ChunkSize (total size - 8) at offset 4
  mergedBuffer.writeUInt32LE(36 + totalDataLength, 4);
  // Update the Subchunk2Size (data size) at offset 40
  mergedBuffer.writeUInt32LE(totalDataLength, 40);

  // Copy the data from each buffer
  let offset = 44;
  for (const buf of buffers) {
    if (buf.length >= 44) {
      const dataLength = buf.length - 44;
      buf.copy(mergedBuffer, offset, 44, buf.length);
      offset += dataLength;
    }
  }

  return mergedBuffer;
}

async function synthesizeAudio(scriptArray) {
  const apiKey = process.env.SARVAM_API_KEY;
  const endpoint = 'https://api.sarvam.ai/text-to-speech';

  if (!apiKey) {
    throw new Error("SARVAM_API_KEY is not set in the environment.");
  }

  const buffers = [];
  let currentTime = 0;

  for (const item of scriptArray) {
    const speaker = item.speaker === 'A' ? 'shubh' : 'priya';
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'api-subscription-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: [item.line],
        target_language_code: "en-IN",
        speaker: speaker,
        model: "bulbul:v3"
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Sarvam API error: ${errText}`);
    }

    const data = await response.json();
    if (data.audios && data.audios.length > 0) {
      const base64Audio = data.audios[0];
      const buffer = Buffer.from(base64Audio, 'base64');
      buffers.push(buffer);

      if (buffer.length >= 44) {
        const byteRate = buffer.readUInt32LE(28); // Bytes per second
        const dataSize = buffer.length - 44; // Assuming 44 byte header
        const duration = dataSize / byteRate;
        
        item.startTime = currentTime;
        currentTime += duration;
        item.endTime = currentTime;
      } else {
        item.startTime = currentTime;
        item.endTime = currentTime;
      }
    } else {
      throw new Error(`Sarvam API returned unexpected format.`);
    }
  }

  return {
    audioBuffer: mergeWavBuffers(buffers),
    scriptWithTimestamps: scriptArray
  };
}

module.exports = { synthesizeAudio };
