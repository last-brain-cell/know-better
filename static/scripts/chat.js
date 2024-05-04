const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    appendUserMessage(userMessage);
    userInput.value = '';

    // Simulate bot response (replace with actual bot logic)
    setTimeout(async () => {
        const botResponse = await generateBotResponse(userMessage);
        appendBotMessage(botResponse);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 500);
});

function appendUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'user-message');
    messageElement.innerHTML = `<p>${message}</p>`;
    chatContainer.appendChild(messageElement);
}

function appendBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'bot-message');
    messageElement.innerHTML = `<p>${message}</p>`;
    chatContainer.appendChild(messageElement);
}

async function generateBotResponse(userMessage) {
    try {
        const response = await fetch('http://localhost:8000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage, user_id: 1 })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error fetching bot response:', error);
        return "I'm sorry, there was an error processing your request.";
    }
}