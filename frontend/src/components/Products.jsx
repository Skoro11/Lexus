// ProductTest.jsx
import axios from 'axios';

let products = [];
let flashSaleProducts = [];
let BestSellingProducts = [];
let ExploreProducts = [];

// Function to fetch and filter products
const fetchAndFilterProducts = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}`);
    products = response.data.map(product => ({
      id: product._id,
      slug: product.slug,
      image: product.image,
      stars: product.stars,
      name: product.name,
      price: product.price,
      numOfReviews: product.numOfReviews === null ? "" : product.numOfReviews, // Check if null
      tag: product.tag,
      discountedPrice: product.discountedPrice,
      description: product.description,
      category: product.category,
      specialCategory: product.specialCategory,
    }));

    flashSaleProducts = products.filter(product => product.specialCategory === "Flash Sales");
    BestSellingProducts = products.filter(product => product.specialCategory === "Best Selling");
    ExploreProducts = products.filter(product => product.specialCategory === "Explore");
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Initialize the function but WITHOUT `await`
fetchAndFilterProducts().then(() => {
  console.log("Products data fetched successfully!");
});

// Export the variables (but they may be empty initially)
export { products, flashSaleProducts, BestSellingProducts, ExploreProducts };
