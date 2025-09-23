import UserAuth from "../models/user.model.js";
import Product from "../models/product.model.js";

//Adds an item to the cart, requires access token and product id from the request
export async function AddToCart(req, res) {
  try {
    const productId = req.body._id;
    const userId = req.user.id;

    const foundedUser = await UserAuth.findById(userId);

    if (!foundedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const userCart = foundedUser.cart || [];

    const existingItem = userCart.find(
      (item) => item._id.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      userCart.push({ _id: productId, quantity: 1 });
    }
    await foundedUser.save();

    res.status(200).json({ user: foundedUser });
  } catch (error) {
    console.error("AddToCart error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
//Subtracts an item from the cart, requires access token and product id from the request
//Stops at the quantity one, doesn't go below
export async function SubtractQuantityByOne(req, res) {
  try {
    const { _id } = req.body;
    const userId = req.user.id;
    const foundedUser = await UserAuth.findById(userId);
    if (!foundedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const userCart = foundedUser.cart || [];

    const existingItem = userCart.find((item) => item._id.toString() === _id);

    if (existingItem && existingItem.quantity >= 2) {
      existingItem.quantity--;
      await foundedUser.save();
      res.status(200).json({ user: foundedUser });
    } else {
      return res.status(200).json({ user: foundedUser });
    }
  } catch (error) {
    console.error("SubtractQuantityByOne error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
//Removes an item completely from the cart, requires access token and product id
export async function RemoveFromCart(req, res) {
  try {
    const productId = req.body._id;
    const userId = req.user.id;

    const foundedUser = await UserAuth.findById(userId);

    if (!foundedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Safely get user's cart, defaulting to empty array if not set
    const userCart = foundedUser.cart || [];
    console.log("User cart", userCart);
    // Filter out the item with the given _id
    const updatedCart = userCart.filter(
      (item) => item._id.toString() !== productId
    );

    // Update user's cart
    foundedUser.cart = updatedCart;
    await foundedUser.save();

    // Return updated user data (or just the cart if you prefer)
    return res.status(200).json({ user: foundedUser });
  } catch (error) {
    console.error("RemoveFromCart error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
//Removes everything from the cart needs only user id from the access token
export async function RemoveAllFromCart(req, res) {
  try {
    const userId = req.user.id;
    const foundedUser = await UserAuth.findById(userId);

    if (!foundedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    foundedUser.cart = [];
    await foundedUser.save();
    return res.status(200).json({ user: foundedUser });
  } catch (error) {
    console.error("RemoveAllFromCart error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
//Gets all the items from the user cart, fetches all the data from the Product so the frontend can render all the necessary information
export async function GetCartItems(req, res) {
  try {
    let productData = [];
    const userId = req.user.id;

    const foundedUser = await UserAuth.findById(userId);
    if (!foundedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const userCart = foundedUser.cart || [];

    for (const cartItem of userCart) {
      let item = cartItem._id;
      let quantity = cartItem.quantity;
      let response = await Product.findById(item);

      response.quantity = quantity;

      productData.push(response);
    }

    res.status(200).json({ ProductData: productData });
  } catch (error) {
    console.error("GetCartItems error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
