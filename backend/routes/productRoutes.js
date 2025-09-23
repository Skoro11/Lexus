import { Router } from "express";
import {
  AddMultipleProducts,
  AddProduct,
  AllProducts,
  EditProduct,
  fetchById,
  filterProductsByCategory,
  RemoveProduct,
  searchByQuery,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/all", AllProducts);
router.get("/", searchByQuery);
router.post("/add", AddProduct);
router.post("/multiple", AddMultipleProducts);
router.delete("/remove", RemoveProduct);
router.put("/edit", EditProduct);
router.post("/search", filterProductsByCategory);
router.get("/:id", fetchById);

export default router;
