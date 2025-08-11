import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { connectToDB } from "./database.js";
import { Quote } from "./schemas.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to database
connectToDB();

// API Routes
app.get("/", (_req, res) => {
  res.send(JSON.stringify("MongoDB API"));
});

app.get("/api/quotes", async (_req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch quotes!", error });
  }
});

app.post("/api/quotes", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Text is required!" });
    }
    const created = await Quote.create({ text: text.trim() });
    res.status(200).json({ message: "Quote created successfully!", created });
  } catch (error) {
    res.status(500).json({ message: "Failed to create quote!", error });
  }
});

app.put("/api/quotes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid quote id!" });
    }

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Text is required!" });
    }

    const updated = await Quote.findByIdAndUpdate(
      id,
      { text: text.trim() },
      { new: true }
    );

    if (!updated) {
      return res.status(401).json({ error: "Quote not found!" });
    }

    res.status(200).json({ message: "Quote updated successfully!", updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update quote!", error });
  }
});

app.delete("/api/quotes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid quote id!" });
    }

    const deleted = await Quote.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(401).json({ error: "Quote not found!" });
    }

    res.status(200).json({ message: "Quote deleted successfully!", deleted });
  } catch (error) {
    res.status(500).json({ message: "Failed to update quote!", error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
