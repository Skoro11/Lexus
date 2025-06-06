import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cookieParser from "cookie-parser"


dotenv.config()
const app = express();
const port= process.env.PORT



app.use(express.json())
app.use(cors({
  origin: '*', // your frontend origin
  credentials: true,                
}));

app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/product",productRoutes)

export default app;