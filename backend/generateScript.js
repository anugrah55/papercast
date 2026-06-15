async function generateScript(paperText, tone) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set in the environment.");
  }

  const endpoint = 'https://api.openai.com/v1/chat/completions';

  const systemPrompt = `You are a podcast script writer. Convert the research paper below into an engaging two-host podcast episode.

Hosts:
- Host A (Alex): curious, asks clarifying questions, uses analogies, represents the intelligent layperson
- Host B (Sam): the expert, explains clearly, gets excited about implications

Tone: ${tone}
- casual = conversational, fun, accessible
- technical = accurate, detailed, uses correct terminology
- hype = energetic, emphasizes how groundbreaking the findings are

Rules:
- Cold open: start with a hook that would stop someone from skipping the episode. Never start with "Welcome to the podcast."
- Comprehensive Coverage: Ensure you cover the entire gist of the paper from start to finish. Include the background problem, the methodology used, the key results, and the final conclusions or future implications.
- Cover: the problem the paper solves, how they solved it, why it matters, one surprising or counterintuitive finding
- Include natural reactions: "wait so...", "hold on", "that's wild", interruptions, etc.
- Target length: 700-1000 words total across all lines (~5-8 min read aloud)
- Return ONLY a raw JSON array. No markdown, no backticks, no explanation. Format exactly:
[
  { "speaker": "A", "line": "..." },
  { "speaker": "B", "line": "..." }
]`;

  const body = {
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `PAPER CONTENT:\n${paperText}` }
    ],
    temperature: 0.8,
    max_tokens: 8192
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
  let scriptText = data.choices[0].message.content;

  // Strip markdown fences
  scriptText = scriptText.replace(/```json/gi, '').replace(/```/g, '').trim();

  try {
    const scriptJson = JSON.parse(scriptText);
    return scriptJson;
  } catch (error) {
    console.error("Raw scriptText that failed parsing:", scriptText);
    throw new Error("Failed to generate script. Try again.");
  }
}

module.exports = { generateScript };
