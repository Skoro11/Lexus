import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cookieParser from "cookie-parser"
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { authenticateToken, authenticateTokenFromCookie } from "./middleware/TokenVerification.js"
dotenv.config()
const app = express();
const port= process.env.PORT

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_PATH,  // your frontend origin
  credentials: true,                
}));

app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/product",productRoutes)
app.get("/",(req,res)=>{
 res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get("/welcome",authenticateTokenFromCookie, (req,res)=>{
     res.sendFile(path.join(__dirname, 'public', 'welcome.html'));

})
app.get("/protected",(req,res)=>{
     res.sendFile(path.join(__dirname, 'public', 'protected.html'));

})

export default app;