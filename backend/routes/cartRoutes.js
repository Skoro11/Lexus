import express from "express"
import { AddToCart,RemoveAllFromCart,RemoveFromCart,GetCartItems, SubtractQuantityByOne} from "../controllers/cartController.js";
const router = express.Router();

router.post("/add", AddToCart)
router.post("/remove", RemoveFromCart)
router.post("/remove/all", RemoveAllFromCart)
router.get("/get",GetCartItems)
router.post("/subtract",SubtractQuantityByOne)
export default router;