import "dotenv/config";
import express from "express";
import OpenAI from "openai";

const app = express();
const port = 3000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());
app.use(express.static("."));

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await client.responses.create({
      model: "gpt-6-luna",
      instructions:
        "You are Seed, a helpful, friendly AI assistant. Give clear and useful answers.",
      input: messages
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      reply: "Sorry, Seed couldn't respond right now."
    });
  }
});

app.listen(port, () => {
  console.log(`Seed is running at http://localhost:${port}`);
});