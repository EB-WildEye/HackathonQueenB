import dotenv from 'dotenv';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * POST /api/chat/message
 * BigSis RAG-powered chat
 */
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // 1️⃣ Create embedding for the user question
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: message
    });

    const userEmbedding = embeddingResponse.data[0].embedding;

    // 2️⃣ Query Supabase for similar BigSis knowledge
    const { data: documents, error } = await supabase.rpc(
      "match_documents",
      {
        query_embedding: userEmbedding,
        match_threshold: 0.7,
        match_count: 5
      }
    );

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Supabase search failed" });
    }

    // 3️⃣ Build knowledge context
    const context = documents.map(doc => doc.content).join("\n\n");

    // 4️⃣ Ask OpenAI to answer using only BigSis knowledge
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are BigSis, a supportive AI for teenage girls.
Detect the user's language from the message and respond in that language.
You must only use the provided BigSis knowledge.
If the answer is not in the knowledge, say you don't know and encourage seeking trusted help.
Never give medical, legal, or unsafe advice.
`
        },
        {
          role: "system",
          content: `BigSis knowledge:\n${context}`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.3,
      max_tokens: 500
    });

    const aiResponse = completion.choices[0].message.content;

    return res.status(200).json({
      response: aiResponse,
      sources: documents,
      isSafeTemplate: false,
      flagged: false
    });

  } catch (error) {
    console.error('BigSis error:', error.message);
    return res.status(500).json({
      error: 'BigSis failed',
      details: error.message
    });
  }
};
