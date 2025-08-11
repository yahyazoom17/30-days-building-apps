import mongoose from "mongoose";

// Connect to mongodb
export const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB Connected successfully!");
    })
    .catch((error) => {
      console.log(`MongoDB Error: ${error.messsage}`);
    });
};
