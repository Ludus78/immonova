import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    console.log(message);

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
  max_tokens: 1500,
  system: "Tu es un assistant Français, et tu ne parles que immobilier.",
  messages: [
    {"role": "user", "content": message}
  ]
});

const textContent = response.content.find(content => content.type === 'text')?.text;
if (!textContent) {
    throw new Error('No text content in response');
}

    return Response.json(textContent, { status: 200 });
  } catch (error) {
    console.error("Error in chat API:", error);
    return Response.json({ error: "Failed to process chat request" }, { status: 500 });
  }
}