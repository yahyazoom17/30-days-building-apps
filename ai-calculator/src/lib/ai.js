export async function explainExpression(expr, res) {
  if (!expr || !res) {
    return { message: "Please type some expression!", status: "error" };
  }

  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey)
    return { message: "Please provide valid API Key!", status: "error" };

  const systemPrompt = `You are a kind math tutor for absolute beginners. Explain like to a 10-years-old. 
  - Use 3-7 short bullet steps. 
  - Prefer everday words. 
  - Do not invent new numbers. 
  - Explain the order of operations if relavant. 
  - End with one-line recap.`;

  const userPrompt = `
  Expression: ${expr}\n
  Result: ${res}\n
  Explain simply, in steps, without extra symbols.`;

  const reqBody = {
    model: "google/gemini-flash-1.5",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
  };

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      }
    );

    // if (!res.ok) return "AI request failed!";

    const data = await response.json();

    console.log(data);

    const text = data?.choices?.[0]?.message?.content?.trim();

    if (text) {
      return {
        message: text,
        status: "success",
      };
    } else {
      return {
        message: "AI did not respond!",
        status: "error",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      message: "Couldn't reach AI service for a moment! Try again later...",
      status: "error",
    };
  }
}
