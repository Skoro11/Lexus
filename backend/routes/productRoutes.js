import {Router} from "express"
import { allProducts, bestSellingProducts, exploreProducts, fetchById, flashSaleProducts, searchByQuery } from "../controllers/product.controller.js";

const router = Router();


router.get("/all",allProducts)
router.get("/flash_sales",flashSaleProducts)
router.get("/best_selling",bestSellingProducts)
router.get("/explore",exploreProducts)
router.get("/:id",fetchById)
router.get("/",searchByQuery)
export default router;