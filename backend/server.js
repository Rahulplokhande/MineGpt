import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  connectDB();
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with DB successfully");
  } catch (err) {
    console.log("Failed to connect with DB", err);
  }
};


app.get("/", (req, res) => {
  res.send("MineGpt backend is live 🚀");
});