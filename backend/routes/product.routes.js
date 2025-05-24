import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  createMultipleProducts,
  updateProduct,
  deleteProductById,
  deleteAllProducts
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createMultipleProducts); // Handles both single and multiple
router.put("/:id", updateProduct);
router.delete("/:id", deleteProductById);
router.delete("/", deleteAllProducts);

export default router;
