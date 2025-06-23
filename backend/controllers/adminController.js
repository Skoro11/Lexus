import Product from "../models/product.model.js";

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve products." });
  }
}

export async function addNewProduct(req, res) {
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

    const newProduct = {
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
    };

    console.log("Creating product:", newProduct);

    const createdProduct = await Product.create(newProduct);

    // Return the newly created product
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
}

export async function removeProduct(req, res) {
  const { _id } = req.body;

  const output = products.findIndex((item) => String(item._id) === String(_id));

  if (output !== -1) {
    products.splice(output, 1);
    console.log("Deleted index:", output);
    res.status(200).json(products);
  } else {
    console.warn("No item found with _id:", _id);
    res.status(404).json({ error: "Item not found" });
  }
}

export async function updateProduct(req, res) {
  const updates = req.body;
  const product = products.find((item) => item._id === updates._id);

  for (let key in updates) {
    if (product[key] !== undefined && product[key] !== null) {
      product[key] = updates[key];
    }
  }

  res.status(200).json(product);
}
