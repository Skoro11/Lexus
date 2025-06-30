import { db, products } from "../config/localDB.js";

let quantity = 1;
export async function AddToCart(req, res) {
  const { _id } = req.body;
  const userId = req.user.id;

  const foundedUser = db.find((user) => user._id === userId);
  if (!foundedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const userCart = foundedUser.cart || [];

  const existingItem = userCart.find((item) => item._id === _id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    userCart.push({ _id, quantity });
  }

  res.status(200).json({ user: foundedUser });
}
export async function SubtractQuantityByOne(req, res) {
  try {
    const { _id } = req.body;
    const userId = req.user.id;
    const foundedUser = db.find((user) => user._id === userId);
    if (!foundedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const userCart = foundedUser.cart || [];

    const existingItem = userCart.find((item) => item._id === _id);

    if (existingItem && existingItem.quantity >= 2) {
      existingItem.quantity--;
      res.status(200).json({ user: foundedUser });
    } else {
      // Safely get user's cart, defaulting to empty array if not set
      const userCart = foundedUser.cart || [];

      // Filter out the item with the given _id
      const updatedCart = userCart.filter((item) => item._id !== _id);

      // Update user's cart
      foundedUser.cart = updatedCart;

      return res.status(200).json({ user: foundedUser });
    }
  } catch (error) {
    console.log("Error " + error);
  }
}
export async function RemoveFromCart(req, res) {
  const { _id } = req.body; // ID of the item to remove
  const userId = req.user.id; // authenticated user ID

  // Find the user in your database (db)
  const foundedUser = db.find((user) => user._id === userId);

  if (!foundedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  // Safely get user's cart, defaulting to empty array if not set
  const userCart = foundedUser.cart || [];

  // Filter out the item with the given _id
  const updatedCart = userCart.filter((item) => item._id !== _id);

  // Update user's cart
  foundedUser.cart = updatedCart;

  // Return updated user data (or just the cart if you prefer)
  return res.status(200).json({ user: foundedUser });
}
export async function RemoveAllFromCart(req, res) {
  const userId = req.user.id;
  const foundedUser = db.find((user) => user._id === userId);

  if (!foundedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  foundedUser.cart = [];

  return res.status(200).json({ user: foundedUser });
}

export async function GetCartItems(req, res) {
  const ids = [];
  const quantity = [];
  const output = [];

  const userId = req.user.id;
  const foundedUser = db.find((user) => user._id === userId);
  if (!foundedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  const userCart = foundedUser.cart || [];

  userCart.forEach((item) => {
    ids.push(Number(item._id));
    quantity.push(item.quantity);
  });

  ids.forEach((item) => {
    const filter = products.filter((product) => product._id === item);
    const indexOfItem = ids.indexOf(item);
    filter.push({ quantity: quantity[indexOfItem] });
    filter.flat(Infinity);
    const result = Object.assign({}, ...filter);
    console.log(result);

    output.push(result);
  });

  res.status(200).json({ userCart: output.flat(Infinity) });
}
