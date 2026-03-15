import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key_for_now',
});

export const classifyMessageIntent = async (text) => {
  // If no real API key, return a mock response
  if (!process.env.OPENAI_API_KEY) {
    console.log('[Mock AI] Classifying message intent:', text.substring(0, 30));
    const isPromotional = text.toLowerCase().includes('sale') || text.toLowerCase().includes('offer');
    return isPromotional ? 'promotional' : 'normal';
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Classify this message into one of: important, promotional, spam, normal. Reply ONLY with the classification word.' },
        { role: 'user', content: text }
      ],
      temperature: 0,
      max_tokens: 10,
    });
    
    return response.choices[0].message.content.trim().toLowerCase();
  } catch (error) {
    console.error('Error classifying intent:', error);
    return 'normal';
  }
};

export const summarizeThread = async (messagesArray) => {
  if (!process.env.OPENAI_API_KEY) {
    return '[Mock Summary] User discussed upcoming meeting and requested documents.';
  }

  const threadText = messagesArray.map(m => `${m.senderName || 'Unknown'}: ${m.content}`).join('\n');

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Summarize the following conversation thread concisely in 1-2 sentences.' },
        { role: 'user', content: threadText }
      ],
      temperature: 0.3,
    });
    
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error summarizing thread:', error);
    return null;
  }
};

export const generateSmartReply = async (text, context = '') => {
  if (!process.env.OPENAI_API_KEY) {
    return 'Sure, that sounds good to me!';
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: `Draft a short, professional smart reply to this message. Context about user preferences: ${context}` },
        { role: 'user', content: text }
      ],
      temperature: 0.7,
      max_tokens: 50,
    });
    
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating smart reply:', error);
    return null;
  }
};
