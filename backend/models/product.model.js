import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please input a Product name"],
    },

    price: {
      type: Number,
      required: [true, "Please give a product price"],
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
    },

    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    stars: {
      type: Number,
      required: true,
      default: 0,
    },
    tag: {
      type: String,
      required: false,
      default: "",
    },
    numOfReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    discountedPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    campaign: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
