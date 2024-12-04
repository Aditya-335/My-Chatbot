const API_URL = 'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill';
const API_KEY = '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'; 

document.getElementById('ask-button').addEventListener('click', () => {
    const inputText = document.getElementById('user-input').value;
    if (inputText) {
        fetchResponse(inputText);
    } else {
        document.getElementById('response-output').innerText = "Please enter something to ask!";
    }
});

async function fetchResponse(inputText) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputs: inputText })
        });

        const data = await response.json();
        console.log(data);  

        // Check if the model returns generated text and display it
        const responseText = data[0]?.generated_text || "No response from model";
        document.getElementById('response-output').innerText = responseText;
    } catch (error) {
        console.error('Error fetching response:', error);
        document.getElementById('response-output').innerText = "There was an error. Please try again.";
    }
}
