import express from "express"
import { AddToCart,RemoveAllFromCart,RemoveFromCart } from "../controllers/cartController.js";
const router = express.Router();

router.post("/add", AddToCart)
router.post("/remove", RemoveFromCart)
router.post("/remove/all", RemoveAllFromCart)

export default router;