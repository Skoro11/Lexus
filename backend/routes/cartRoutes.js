import express from "express"
import { AddToCart,RemoveAllFromCart,RemoveFromCart,GetCartItems} from "../controllers/cartController.js";
import { authenticateToken } from "../middleware/TokenVerification.js";
const router = express.Router();

router.post("/add",authenticateToken, AddToCart)
router.post("/remove",authenticateToken, RemoveFromCart)
router.post("/remove/all",authenticateToken, RemoveAllFromCart)
router.get("/get",authenticateToken,GetCartItems)
export default router;