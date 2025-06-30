import { Router } from "express";
import {
  AddProduct,
  AllProducts,
  allProducts,
  bestSellingProducts,
  exploreProducts,
  fetchById,
  flashSaleProducts,
  searchByQuery,
} from "../controllers/product.controller.js";

const router = Router();

/* router.get("/all", allProducts); */
router.get("/flash_sales", flashSaleProducts);
router.get("/best_selling", bestSellingProducts);
router.get("/explore", exploreProducts);
router.get("/all", AllProducts);
router.get("/:id", fetchById);

router.get("/", searchByQuery);
router.post("/add", AddProduct);

export default router;
