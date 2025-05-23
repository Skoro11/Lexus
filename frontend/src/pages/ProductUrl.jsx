import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { products } from "../components/Products"; // Import the product list
import { useCart } from "../context/ContextCart";
import { useLike } from "../context/ContextLike";
import "../styles/ProductUrl.css";
import axios from "axios"
function ProductUrl() {
  const { slug, id } = useParams(); // Get slug and id from the URL
  const [product, setProduct] = useState(null); // State to hold the product data
  const { addToCart } = useCart();
  const { addToLike, likeList } = useLike();

  // Function to check if a product is already liked
  const isLiked = (productId) => likeList.some((item) => item.id === productId);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch product using only the ID
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
        console.log("Fetched product:", res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-container">
      <div className="left-sidebar">
        <img src={product.image} alt={product.name} />
        <img src={product.image} alt={product.name} />
        <img src={product.image} alt={product.name} />
      </div>
      <div className="main-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info-info">
        <div className="product-name-product">
          <h2>{product.name}</h2>
          <img
            src={isLiked(product.id) ? "heart-fill.png" : "heart-empty.png"}
            onClick={() => addToLike(product)}
            style={{ cursor: "pointer" }}
            alt="like"
          />
        </div>
        <div className="stars-stock flex align-center">
          {[...Array(5)].map((_, index) => (
            <img
              key={index}
              src={index < product.stars ? "full-star.png" : "empty-star.png"}
              alt="star"
            />
          ))}
          ({product.numOfReviews}) | <span className="green padding-left-5">In Stock</span>
        </div>
        <div className="price-product-description">{product.price}$</div>
        <div className="product-description-product">{product.description}</div>

        <div className="flex-container">
          <button className="buy-btn mb-10" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
        <div className="services-container">
          <div className="services">
            <div className="flexed padding-3 bottom-underline">
              <img src="delivery.png" alt="delivery" />
              <div>
                <span className="delivery">Free Delivery</span>
                <br />
                <span className="details">
                  Enter your postal code for Delivery Availability
                </span>
              </div>
            </div>

            <div className="flexed padding-3">
              <img src="return.png" alt="return" />
              <div>
                <span className="delivery">Return Delivery</span>
                <br />
                <span className="details">Free 30 Days Delivery Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductUrl;
