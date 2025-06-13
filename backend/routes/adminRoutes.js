import express from "express";
import {getAllProducts,addNewProduct,updateProduct,removeProduct} from "../controllers/adminController.js"

const router = express.Router();

router.get("/get",getAllProducts)
router.post("/post",addNewProduct)
router.put("/update", updateProduct)
router.delete("/delete",removeProduct)


export default router;
