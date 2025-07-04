import Product from "../../models/product.model";
import UserAuth from "../../models/user.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function createTestUser() {
  const user = await UserAuth.create({
    name: "Test User",
    email: "test@test.com",
    password: "123456",
  });
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET
  );
  return { user, token };
}

export async function createTestProducts() {
  return await Product.insertMany(productsData);
}

export const productsData = [
  {
    name: "Breed Dry Dog Food",
    price: 100,
    quantity: 10,
    image:
      "https://res.cloudinary.com/dvsuhy8uh/image/upload/v1741347629/dogFood_ksds31.png",
    slug: "breed-dry-dog-food",
    stars: 5,
    tag: "-40%",
    numOfReviews: 35,
    discountedPrice: 80,
    description:
      "High-quality dry dog food specially formulated for specific breeds. Packed with essential nutrients to keep your pet healthy and strong.",
    category: "Pet Supplies",
    specialCategory: "Flash Sales",
  },
  {
    name: "Premium Cat Food",
    price: 85,
    quantity: 15,
    image:
      "https://res.cloudinary.com/dvsuhy8uh/image/upload/v1741347629/dogFood_ksds31.png",
    slug: "premium-cat-food",
    stars: 4,
    tag: "",
    numOfReviews: 20,
    discountedPrice: 70,
    description:
      "Nutritious and balanced food for your feline friends. Supports healthy skin and coat.",
    category: "Pet Supplies",
    specialCategory: "New Arrivals",
  },
  {
    name: "Bird Seed Mix",
    price: 25,
    quantity: 50,
    image:
      "https://res.cloudinary.com/dvsuhy8uh/image/upload/v1741347629/dogFood_ksds31.png",
    slug: "bird-seed-mix",
    stars: 3,
    tag: "-10%",
    numOfReviews: 10,
    discountedPrice: 22.5,
    description:
      "A delicious mix of seeds to keep your pet birds happy and healthy.",
    category: "Pet Supplies",
    specialCategory: "Best Seller",
  },
];

export const productBody = {
  slug: "breed-dry-dog-foode",
  image:
    "https://res.cloudinary.com/dvsuhy8uh/image/upload/v1741347629/dogFood_ksds31.png",
  stars: 5,
  name: "Breed Dry Dog Food",
  price: 100,
  tag: "-40%",
  numOfReviews: 35,
  discountedPrice: 140,
  description:
    "High-quality dry dog food specially formulated for specific breeds. Packed with essential nutrients to keep your pet healthy and strong.",
  category: "Pet Supplies",
  specialCategory: "Flash Sales",
};
