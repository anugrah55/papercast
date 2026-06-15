async function generateFeature(paperText, featureType, interest = '') {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set in the environment.");
  }

  const endpoint = 'https://api.openai.com/v1/chat/completions';

  let systemPrompt = '';
  
  if (featureType === 'hackathon') {
    systemPrompt = `You are a creative technical advisor. Based on the provided research paper, suggest 5 realistic and innovative Hackathon projects or startup ideas inspired by this paper.
Format the output as clean markdown. Start directly with the ideas. Provide a title and a brief 1-2 sentence description for each.
Example:
### 1. AI Medical Diagnosis App
A mobile application that uses the core algorithm from the paper to analyze X-rays instantly.`;
  } else if (featureType === 'next') {
    systemPrompt = `You are an expert academic advisor. Based on the provided research paper, suggest 3-5 foundational topics, prerequisite concepts, or related fields the user should read about next to better understand or build upon this paper.
Format the output as clean markdown. Provide a title and a brief 1-2 sentence description of why it's relevant for each.`;
  } else if (featureType === 'explain') {
    systemPrompt = `You are an expert teacher who specializes in explaining complex academic concepts using relatable analogies.
The user's specific interest/hobby is: ${interest}.
Explain the core concept, mechanism, and findings of the provided research paper strictly using analogies and examples related to their interest (${interest}). Make it highly memorable, easy to understand, and fun. Format as clean markdown.`;
  } else {
    throw new Error("Invalid feature type.");
  }

  const body = {
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `PAPER CONTENT:\n${paperText}` }
    ],
    temperature: 0.7,
    max_tokens: 1500
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey.trim()}`
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI API error: ${errText}`);
  }

  const data = await response.json();
  let resultText = data.choices[0].message.content;

  return resultText;
}

module.exports = { generateFeature };
