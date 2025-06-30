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
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
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
      name: String,
      price: Number,
      quantity: { type: Number, default: 1 },
    },
  ],
});

const UserAuth = mongoose.model("UserAuth", userSchema);

export default UserAuth;
