import "dotenv/config";

const getOpenAIAPIResponse = async(message) => {
  //  return `This is a mock response for: ${message}`;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{
                role: "user",
                content: message
            }]
        })
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
        const data = await response.json();
        // log the full response for debugging
        console.log("OpenAI API response status", response.status, "data", data);
        if (!response.ok) {
            console.error("OpenAI request failed", response.status, data);
            // throw an error so callers can handle it with details
            throw new Error(data?.error?.message || `OpenAI API returned status ${response.status}`);
        }
        if (data && data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        } else {
            console.error("Unexpected OpenAI response format", data);
            throw new Error("Unexpected OpenAI response format");
        }
    } catch(err) {
        console.log("Error calling OpenAI API", err);
        // re-throw so callers (like chat route) can act on the actual error message
        throw err;
    }
}

export default getOpenAIAPIResponse;
