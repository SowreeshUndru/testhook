import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
const uri = "mongodb://localhost:27017";
// MongoDB connection
mongoose
  .connect(uri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define a schema & model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// Simple routes
app.get("/", (req, res) => {
  res.send("🚀 Express + MongoDB working!");
});

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🌍 Server running at http://localhost:${port}`));

//hello hello
//hello  gefjadfjldskfSKkdKDM
