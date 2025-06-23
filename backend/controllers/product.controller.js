import Product from "../models/product.model.js";

import mongoose from "mongoose";

export async function allProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.send(500).json({ message: error });
  }
}

export async function flashSaleProducts(req, res) {
  try {
    const flashSaleProducts = await Product.find({
      specialCategory: "Flash Sales",
    });
    res.status(200).json({ flashSaleProducts });
  } catch (error) {
    res.send(500).json({ message: error });
  }
}

export async function bestSellingProducts(req, res) {
  try {
    const bestSellingProducts = await Product.find({
      specialCategory: "Best Selling",
    });

    res.status(200).json({ bestSellingProducts });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function exploreProducts(req, res) {
  try {
    const exploreProducts = await Product.find({
      specialCategory: "Explore",
    });

    res.status(200).json({ exploreProducts });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function fetchById(req, res) {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const IdItem = await Product.findById(id);

    if (!IdItem) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, product: IdItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function searchByQuery(req, res) {
  try {
    const searchTerm = req.query.search;

    // Return early if search term is empty or only whitespace
    if (!searchTerm || searchTerm.trim() === "") {
      return res.status(200).json({ filteredProducts: [] });
    }

    const regex = new RegExp(searchTerm, "i");

    const filteredProducts = await Product.find({
      name: { $regex: searchTerm, $options: "i" }, // case-insensitive
    });

    res.status(200).json({ filteredProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
