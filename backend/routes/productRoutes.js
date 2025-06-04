import {Router} from "express"
import { allProducts } from "../controllers/product.controller.js";

const router = Router();


router.get("/all",allProducts)


export default router;