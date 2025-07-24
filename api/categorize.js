import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that extracts a list of ordered items from a message. Output should be a JSON array. Each item must include: item name, quantity, unit (optional), and category like Grocery, Beverage, Medicine, etc. Only return JSON.",
        },
        { role: "user", content: text },
      ],
    });

    const parsed = completion.choices[0]?.message?.content?.trim();
    return res.status(200).json({ parsed });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "OpenAI API Error" });
  }
}
