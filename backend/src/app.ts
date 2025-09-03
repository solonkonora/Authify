import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "../src/routes/auth"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Example route
app.get("/", (_req, res) => {
  res.send("Authify backend is running!");
});

// Auth routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});