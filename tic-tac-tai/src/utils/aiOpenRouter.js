export const getMoverFromAI = async (board, score, gameMode) => {
  const openrouterApiKey = "your-api-key";

  const easyRules = `
  1. You must lose the game
  2. Don't block the opponent if they are about to win.
  3. Otherwise: choose center > corner > side
  `;

  const medRules = `
  1. Win the game if possible
  2. Block the opponent if they are about to win.
  3. Otherwise: choose center > corner > side
  `;
  const hardRules = `
  1. You must win the game
  2. Block the opponent and make him lose.
  3. Otherwise: choose center > corner > side
  `;
  let goals = ``;

  if (gameMode === "Easy") {
    goals = easyRules;
  } else if (gameMode === "Medium") {
    goals = medRules;
  } else if (gameMode === "Hard") {
    goals = hardRules;
  } else {
    goals = medRules;
  }

  const systemPrompt = `
  You are a smart Tic Tac Toe AI playing as "O".
  Your goals:
  ${goals}

  Only return ONE number (0-8). Do not explain.
  `;

  const userPrompt = `
  Current board: ${JSON.stringify(board)}

  Each cell is indexed like this:
  [0][1][2]
  [3][4][5]
  [6][7][8]

  "O" = You (AI)
  "X" = Human
  null = Empty Cell

  Current score: ${JSON.stringify(score)}

  What is your move?
  `;

  const getMoveFromDeepseek = async () => {
    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${openrouterApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-r1:free",
            temperature: 0.2,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      const text = data.choices[0]?.message?.content?.trim() || "";
      const match = text.match(/\d+/);
      const parsedMove = match ? parseInt(match[0], 10) : null;

      console.log("AI Raw Response:", text);
      console.log("Parsed Move:", parsedMove);

      return parsedMove;
    } catch (err) {
      console.error("Error getting move from Deepseek:", err);
      const preferredOrder = [4, 0, 2, 6, 8, 1, 3, 5, 7];
      return preferredOrder.find((i) => board[i] === null && null);
    }
  };

  return await getMoveFromDeepseek();
};
