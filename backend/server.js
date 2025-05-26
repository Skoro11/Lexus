import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";


dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("This is the backend");
});

// Start server
app.listen(port, async () => {
  try {
    await connectDB();
    console.log("App is running on port " + port);
  } catch (error) {
    console.log("There is an error " + error);
  }
});
