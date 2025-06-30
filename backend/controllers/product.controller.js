import { products } from "../config/localDB.js";
import Product from "../models/product.model.js";

export async function allProducts(req, res) {
  try {
    res.status(200).json({ products });
  } catch (error) {
    res.send(500).json({ message: error });
  }
}

export async function flashSaleProducts(req, res) {
  try {
    const flashSaleProducts = products.filter(
      (product) => product.specialCategory === "Flash Sales"
    );
    res.status(200).json({ flashSaleProducts });
  } catch (error) {
    res.send(500).json({ message: error });
  }
}

export async function bestSellingProducts(req, res) {
  try {
    const bestSellingProducts = products.filter(
      (product) => product.specialCategory === "Best Selling"
    );
    res.status(200).json({ bestSellingProducts });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function exploreProducts(req, res) {
  try {
    const exploreProducts = products.filter(
      (product) => product.specialCategory === "Explore"
    );
    res.status(200).json({ exploreProducts });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export function fetchById(req, res) {
  try {
    const { id } = req.params;
    const IdItem = products.filter((product) => product._id == `${id}`);
    res.status(200).json({ IdItem });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export function searchByQuery(req, res) {
  try {
    const searchTerm = req.query.search;

    // Return early if search term is empty or only whitespace
    if (!searchTerm || searchTerm.trim() === "") {
      return res.status(200).json({ filteredProducts: [] });
    }

    const regex = new RegExp(searchTerm, "i");

    const filteredProducts = products.filter((product) =>
      regex.test(product.name)
    );

    res.status(200).json({ filteredProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function AddProduct(req, res) {
  try {
    const {
      slug,
      image,
      stars,
      name,
      price,
      tag,
      numOfReviews,
      discountedPrice,
      description,
      category,
      specialCategory,
    } = req.body;

    const response = await Product.create({
      slug,
      image,
      stars,
      name,
      price,
      tag,
      numOfReviews,
      discountedPrice,
      description,
      category,
      specialCategory,
    });
    res.status(200).json({ response: response });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("AddProduct error", error.message);
  }
}

export async function AllProducts(req, res) {
  try {
    const response = await Product.find({});
    res.status(200).json({ products: response });
  } catch (error) {
    res.status(500).json({ message: message.error });
    console.log("Error getting all products", error.message);
  }
}
