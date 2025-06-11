import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cookieParser from "cookie-parser"
import LikeListRoutes from "./routes/LikeListRoutes.js"
import { authenticateToken } from "./middleware/TokenVerification.js"
dotenv.config()
const app = express();
const port= process.env.PORT



app.use(express.json())
app.use(cors({
  origin: ['https://www.lexusshop.app'], ,
  credentials: true               
}));

app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/cart",authenticateToken,cartRoutes)
app.use("/api/product",productRoutes)
app.use("/api/likelist",authenticateToken,LikeListRoutes)

export default app;