// src/api.js
import axios from 'axios';
import { OPENROUTER_API_KEY } from './config';

export async function analyzeThought(userInput) {
  const prompt = `
You're an AI mental coach. When a user gives you a stressful thought, break it down like a CBT therapist. Identify:
1. Thought pattern (e.g., overthinking, catastrophizing)
2. Core fear or belief
3. A reframed, realistic thought
4. A suggested action
End with a calming quote.

User: "${userInput}"
`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'meta-llama/llama-3-8b-instruct',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://localhost',  // You can also remove this line
          'X-Title': 'OverthinkingAnalyzer',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (err) {
    console.error("OpenRouter API error:", err.response?.data || err.message);
    throw err;
  }
}
