import mongoose from "mongoose";

// Database Schemas
const quoteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
  },
  { timestamps: true }
);

export const Quote = mongoose.model("Quote", quoteSchema);
