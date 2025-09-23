import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cookieParser from "cookie-parser";
import LikeListRoutes from "./routes/LikeListRoutes.js";
import { authenticateToken } from "./middleware/TokenVerification.js";
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://lexus-vite-git-main-skoro11s-projects.vercel.app",
      `https://www.lexusshop.app`,
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/cart", authenticateToken, cartRoutes);
app.use("/api/product", productRoutes);
app.use("/api/likelist", authenticateToken, LikeListRoutes);
app.get("/", (req, res) => {
  res.send("Backend");
});
app.get("/apilet/red", (req, res) => res.json({ success: true }));
export default app;
