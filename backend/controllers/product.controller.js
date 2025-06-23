import Product from "../models/product.model.js";

export async function allProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error });
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
