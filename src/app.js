import express from "express";
import pkg from "body-parser";
const { json } = pkg;
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

const app = express();

app.use(cors());
// Middleware
app.use(json());

// Routes
app.use("/api/auth", authRoutes);

export default app;
