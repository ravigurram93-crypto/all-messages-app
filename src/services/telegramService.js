export const sendTelegramMessage = async (botToken, chatId, text) => {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text
      })
    });

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    throw error;
  }
};
