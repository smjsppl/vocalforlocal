// api/categorize.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Missing text input' });
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an assistant that classifies user input into categories: Grocery, Medicine, Complaint, Enquiry, Other."
          },
          {
            role: "user",
            content: `Categorize this message: "${text}"`
          }
        ]
      })
    });

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content || "Unable to categorize.";
    return res.status(200).json({ category: message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch from OpenAI' });
  }
}
