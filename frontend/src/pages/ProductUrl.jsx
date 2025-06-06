import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/ContextCart";
import { useLike } from "../context/ContextLike";
import "../styles/ProductUrl.css";
function ProductUrl() {
  const { id } = useParams(); // Get slug and id from the URL
  const [product, setProduct] = useState([]); // State to hold the product data
  const { addToCart } = useCart();
  const { addToLike, likeList } = useLike();
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Function to check if a product is already liked
  const isLiked = (productId) => likeList.some((item) => item._id === productId);
  useEffect(() => {
    window.scrollTo(0,0)
    const fetchProduct = async () => {
      try {
       
        const response = await fetch(`${API_BASE_URL}/api/product/${id}`,{
          method:"GET"
        });

        const data = await response.json();

        if(response.ok){
          setProduct(data.IdItem[0])
        }else{
          console.log({message:"This data was a response",
            data: data.IdItem[0]
          })
        }
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
            src={isLiked(product._id) ? "heart-fill.png" : "heart-empty.png"}
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
