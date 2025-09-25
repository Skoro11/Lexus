import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
  {
    billingDetails: [
      {
        apartment: String,
        city: String,
        email: String,
        firstName: String,
        phone: Number,
        street: String,
      },
    ],
    cart: [
      {
        productId: String, // ID or SKU
        name: String,
        price: Number,
        quantity: { type: Number, default: 1 },
      },
    ],
    paymentMethod: String,
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model("Orders", OrderSchema);

export default Orders;
