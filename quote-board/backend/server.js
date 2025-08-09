import cors from "cors";
import express from "express";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let quotes = [];
let id = 1;

// Test Routes
app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/api/quotes", (req, res) => {
  res.json(quotes);
});

app.post("/api/quotes", (req, res) => {
  const { text } = req.body;
  const newQuote = { id: id++, text: text };
  quotes.push(newQuote);

  res
    .status(200)
    .json({ quote: newQuote, message: "Quote added successfully!" });
});

app.put("/api/quotes/:id", (req, res) => {
  const quoteId = parseInt(req.params.id);
  const { text } = req.body;
  const quote = quotes.find((q) => q.id === quoteId);
  if (quote) {
    quote.text = text;
    res.json({ quote: quote, message: "Quote updated successfully!" });
  } else {
    res.status(404).json({ error: "Quote not found!" });
  }
});

app.delete("/api/quotes/:id", (req, res) => {
  const quoteId = parseInt(req.params.id);
  quotes = quotes.filter((q) => q.id !== quoteId);
  res.status(200).json({ message: "Quote deleted successfully!" });
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
