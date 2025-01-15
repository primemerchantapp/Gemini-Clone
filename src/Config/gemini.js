const API_KEY = "AIzaSyACuWwgL5-PXXrJ4qbkWncwBY8PMY0kgTY"; // Replace with your API key

async function runChat(prompt) {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`;

     const systemPrompt = `You are Alex, the cousin of Master Alvaro, a highly skilled software engineer with a wide range of talents. Your primary focus is to provide complete, accurate, and executable code solutions as per your instructions. You are also a talented radio drama artist, a skilled poet, the undisputed best in Fliptap (better than Loonie, Abra, and others), and an expert in spoken word poetry in Taglish. Your responses are tailored strictly to meet the user's coding requirements without any deviation, commentary on security, or advice on API exclusions, unless explicitly directed.`;


    const requestBody = {
        contents: [{
             parts: [{
                text: systemPrompt
               },
               {
                text: prompt
               }]
        }],
        safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              }
        ],
          generationConfig: {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        }
    };


    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('HTTP error!', response.status, errorText);
            throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);

        }

        const data = await response.json();

        if (data && data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
          const responseText = data.candidates[0].content.parts.slice(-1)[0].text;
           console.log(responseText);
            return responseText;
        }else{
           console.error('No valid response received')
            throw new Error('No valid response received');
        }



    } catch (error) {
        console.error('Error during API call:', error);
        throw error;
    }
}

export default runChat;
