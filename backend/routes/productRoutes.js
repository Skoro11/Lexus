import { Router } from "express";
import {
  AddProduct,
  AllProducts,
  allProducts,
  bestSellingProducts,
  EditProduct,
  exploreProducts,
  fetchById,
  flashSaleProducts,
  RemoveProduct,
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
router.delete("/remove", RemoveProduct);
router.put("/edit", EditProduct);

export default router;
