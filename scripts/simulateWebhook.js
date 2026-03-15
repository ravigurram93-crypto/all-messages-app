

async function simulateWebhook() {
  const webhookUrl = 'http://localhost:8001/api/webhooks/telegram';
  
  const mockPayload = {
    message: {
      message_id: Math.floor(Math.random() * 1000000),
      from: {
        id: 123456789, // Matches the identifier in our seed script
        first_name: "Mock Sender",
        username: "mocksender"
      },
      date: Math.floor(Date.now() / 1000),
      text: "Hello! This is an end-to-end test message coming from a simulated webhook."
    }
  };

  console.log(`Sending mock webhook to ${webhookUrl}...`);
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mockPayload)
    });
    
    if (response.ok) {
      console.log('Webhook dispatched successfully! Check your frontend UI for the new message.');
    } else {
      console.error('Webhook failed:', response.status, await response.text());
    }
  } catch (error) {
    console.error('Error sending webhook:', error);
  }
}

simulateWebhook();
