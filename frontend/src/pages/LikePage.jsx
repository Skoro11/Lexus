import { useLike } from "../context/ContextLike"; // Adjust the import path accordingly
import { useCart } from "../context/ContextCart"; // Import for cart functionality
import GetTag from "../components/Tags";
import RenderStars from "../components/RenderStars";
import "../styles/LikePage.css";
import { FaTrashAlt } from "react-icons/fa";

const LikePage = () => {
  const { likeList, clearAllLikes, addToLike, getLikeItemsCount } = useLike(); // Destructure functions and state from like context
  const { addToCart, moveAllToCart } = useCart(); // Get the cart functions

  // Function to handle adding all items to the cart and removing from like list
  const handleMoveAllToCart = () => {
    moveAllToCart(likeList, addToCart, addToLike);
    clearAllLikes(); // Move all items from like list to cart
  };

  const handleAddToCart = (product) => {
    addToCart(product); // Add the product to the cart
    addToLike(product); // Remove the product from the like list (wishlist)
  };

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
        {likeList.length === 0 ? (
          <h3>Your like list is empty.</h3>
        ) : (
          likeList.map((product) => (
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
