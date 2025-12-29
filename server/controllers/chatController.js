import dotenv from 'dotenv';

import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * POST /api/chat/message
 * Receives a chat message and returns an AI response using OpenAI
 */
export const sendMessage = async (req, res) => {
  try {
    //console.log('inside sendMessage func');
    //console.log(req.body);
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-4" if you have access
      messages: [
        {
          role: "system",
          content: "You are Big Sis. Detect the user's language from the latest user message. Always respond in that language. Be supportive, safe, concise, and age-appropriate."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const aiResponse = completion.choices[0].message.content;

    return res.status(200).json({
      response: aiResponse,
      isSafeTemplate: false,
      flagged: false
    });

  } catch (error) {
    console.error('OpenAI API error:', error.message);
    return res.status(500).json({ 
      error: 'Failed to process message',
      details: error.message 
    });
  }
};