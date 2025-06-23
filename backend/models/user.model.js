import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    /* unique:true, */
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  cart: [
    {
      productId: String, // ID or SKU
      quantity: { type: Number, default: 1 },
    },
  ],
  likelist: [
    {
      productId: String, // ID or SKU
    },
  ],
  watchlist: [
    {
      productId: String, // ID or SKU
    },
  ],
});

const UserAuth = mongoose.model("UserAuth", userSchema);

export default UserAuth;
