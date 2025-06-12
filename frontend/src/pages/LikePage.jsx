import { useLike } from "../context/ContextLike"; // Adjust the import path accordingly
import { useCart } from "../context/ContextCart"; // Import for cart functionality
import GetTag from "../components/Tags";
import RenderStars from "../components/RenderStars";
import "../styles/LikePage.css";
import { FaTrashAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useState,useEffect } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


 const LikePage = () => {
  const { likeList, clearAllLikes, addToLike, getLikeItemsCount, APIlikeList} = useLike(); // Destructure functions and state from like context
  const { addToCart, moveAllToCart } = useCart(); // Get the cart functions
  const {isLoggedIn, setIsLoggedIn} = useAuth()
  const [hasFetchedAPIList, setHasFetchedAPIList] = useState(false);
  const [filteredItems, setFilteredItems]=useState([]);
  // Function to handle adding all items to the cart and removing from like list
  const handleMoveAllToCart = () => {

    if(isLoggedIn){
      console.log("APIlikeList",APIlikeList)
      APIlikeList.forEach((item)=>{
        console.log("Item",item)
        addToCart(item)
      })
    }


    moveAllToCart(likeList, addToCart, addToLike);
    clearAllLikes(); // Move all items from like list to cart
    setFilteredItems([])
  };

  const handleAddToCart = (product) => {
    addToCart(product); // Add the product to the cart
    addToLike(product); // Remove the product from the like list (wishlist)
  };
  
 useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        const itemIds = APIlikeList.map((item) => item._id);
        if (itemIds.length === 0) {
          setFilteredItems([]);
          return;
        }

        try {
          const response = await axios.post(
            `${API_BASE_URL}/api/likelist/id`,
            { ids: itemIds },
            { withCredentials: true }
          );
          setFilteredItems(response.data.foundedItems || []);
        } catch (error) {
          console.error("Error fetching liked products:", error);
          setFilteredItems([]);
        }
      } else {
        setFilteredItems(likeList);
      }
    };

    fetchData();
  }, [isLoggedIn, APIlikeList, likeList]);

  
  let list=filteredItems

  return (
    <div className="width-1170 mg-inline pd-in-30p pd-in-15-mb">
      <div className="like-header">
        <span className="liked-items">Liked items({getLikeItemsCount()})</span>
        {/* Button to move all items to the cart */}
        <button className="all-bag-btn" onClick={handleMoveAllToCart}>
          Move All To Bag
        </button>
      </div>
      <div className="container-likelist">
        {list.length === 0 ? (
          <h3>Your like list is empty.</h3>
        ) : (
          list.map((product) => (
            <div className="like-list" key={product.id}>
              <div className="relative product-margin">
                <img
                  className="likelist-image"
                  src={product.image}
                  alt={product.name}
                />
                <div className="product-tag">{GetTag(product.tag)}</div>

                {/* Add to Cart button with logic to remove from wishlist */}
                <button
                  className="add-cart"
                  onClick={() => handleAddToCart(product)} // Handle add to cart and remove from wishlist
                >
                  Add To Cart
                </button>

                {/* Remove button for removing from the wishlist */}
                <FaTrashAlt
                  className="remove"
                  onClick={() => addToLike(product)} // Remove from wishlist when clicked
                />
              </div>
              <div>
                <span className="product-name-likelist">{product.name}</span>
                <p className="product-description-likelist">
                  <span className="full-price">{product.price}$</span>
                  <span className="discounted-price">
                    {product.discountedPrice}
                  </span>
                </p>
                <div className="stars">
                  <RenderStars stars={product.stars} />
                  <span className="reviews-number">{`(${product.numOfReviews})`}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LikePage;
