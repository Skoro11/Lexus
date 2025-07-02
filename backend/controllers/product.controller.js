import Product from "../models/product.model.js";

export async function fetchById(req, res) {
  try {
    const { id } = req.params;

    const idItem = await Product.find({ _id: id });
    res.status(200).json({ product: idItem });
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

    // Query DB for products where the name matches regex (case-insensitive)
    const filteredProducts = await Product.find({ name: { $regex: regex } });

    res.status(200).json({ filteredProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function filterProductsByCategory(req, res) {
  try {
    const { specialCategory } = req.body;

    const foundedItems = await Product.find({
      specialCategory: specialCategory,
    });
    if (foundedItems.length > 0)
      res
        .status(200)
        .json({ specialCategory: specialCategory, products: foundedItems });
    if (foundedItems.length < 1)
      res.status(404).json({ message: "Items not found" });
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
export async function AddMultipleProducts(req, res) {
  try {
    const arrayOfProducts = req.body;

    const response = await Product.insertMany(arrayOfProducts);
    res.status(200).json({ insertedItems: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export async function RemoveProduct(req, res) {
  const { _id } = req.body;
  try {
    const deletedProduct = await Product.findByIdAndDelete(_id);
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
    }
    if (deletedProduct) {
      res.status(200).json({ deletedProduct: deletedProduct });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function EditProduct(req, res) {
  const {
    category,
    description,
    discountedPrice,
    image,
    name,
    numOfReviews,
    price,
    quantity,
    slug,
    specialCategory,
    stars,
    tag,
    _id,
  } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      {
        category,
        description,
        discountedPrice,
        image,
        name,
        numOfReviews,
        price,
        quantity,
        slug,
        specialCategory,
        stars,
        tag,
      },
      { new: true, runValidators: true }
    );

    if (updatedProduct)
      res.status(200).json({ updatedProduct: updatedProduct });
    if (!updatedProduct) res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
