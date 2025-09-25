import Orders from "../models/orders.model.js";

export async function AddOrder(req, res) {
  try {
    const { billingDetails, cart, paymentMethod } = req.body;
    // Create new order
    const newOrder = new Orders({
      billingDetails,
      cart,
      paymentMethod,
      createdAt: new Date(), // optional
      status: "pending", // optional default status
    });

    // Save to DB
    const savedOrder = await newOrder.save();

    res.status(200).json(savedOrder);
  } catch (error) {
    console.log("Error with AddOrder function", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error with AddOrder function" });
  }
}
