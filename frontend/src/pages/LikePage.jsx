import { useLike } from "../context/ContextLike"; // Adjust the import path accordingly
import { useCart } from "../context/ContextCart"; // Import for cart functionality
import GetTag from "../components/Tags";
import RenderStars from "../components/RenderStars";
import { FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LikePage = () => {
  const { likeList, clearAllLikes, addToLike, getLikeItemsCount } = useLike(); // Destructure functions and state from like context
  const { addToCart, moveAllToCart } = useCart(); // Get the cart functions
  const [filteredItems, setFilteredItems] = useState([]);
  // Function to handle adding all items to the cart and removing from like list
  const handleMoveAllToCart = () => {
    moveAllToCart(likeList, addToCart, addToLike);
    clearAllLikes(); // Move all items from like list to cart
    setFilteredItems([]);
  };

  const handleAddToCart = (product) => {
    addToCart(product); // Add the product to the cart
    addToLike(product); // Remove the product from the like list (wishlist)
  };

  useEffect(() => {
    const fetchData = async () => {
      setFilteredItems(likeList);
    };

    fetchData();
  }, [likeList]);

  let list = filteredItems;

  return (
    <section className="mt-12 mx-4 md:mx-8">
      <div className="max-w-[1170px] mx-auto">
        <div className="my-5 md:text-xl flex items-center justify-between">
          <span>Liked items({getLikeItemsCount()})</span>
          {/* Button to move all items to the cart */}
          <button
            className="pointer hover-change text-md px-1  hover:text-white hover:bg-[#db4444] border md:py-3 md:px-6 rounded md:font-bold border-[#808080eb]"
            onClick={handleMoveAllToCart}
          >
            Move All To Bag
          </button>
        </div>
        <div className="grid gap-5 grid-cols-2 md:gap-5 md:grid-cols-4 justify-between">
          {list.length === 0 ? (
            <h3>Your like list is empty.</h3>
          ) : (
            list.map((product) => (
              <di key={product.id}>
                <div className="relative group">
                  <Link to={`/product/${product._id}`}>
                    <img
                      className="w-full"
                      src={product.image}
                      alt={product.name}
                    />
                  </Link>
                  <div className="hidden md:block absolute top-2.5 left-2.5 lg:top-5 lg:left-5">
                    {GetTag(product.tag)}
                  </div>

                  {/* Add to Cart button with logic to remove from wishlist */}
                  <button
                    className="hover-animation hidden lg:block hover:bg-[#494949] absolute bottom-0 bg-black w-full py-4 text-white rounded pointer"
                    onClick={() => handleAddToCart(product)} // Handle add to cart and remove from wishlist
                  >
                    Add To Cart
                  </button>

                  {/* Remove button for removing from the wishlist */}
                  <FaTrashAlt
                    className="absolute top-2 right-2.5 lg:right-5 lg:top-5 h-8 py-2 rounded-full bg-white w-8 pointer hover:bg-black hover:text-white hover-change"
                    onClick={() => addToLike(product)} // Remove from wishlist when clicked
                  />
                </div>
                <div className="text-sm md:text-base">
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis mt-2 md:my-2 block">
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </span>
                  <p className="md:mb-2">
                    <span className="text-[#db4444]">{product.price}$</span>
                    <span className="pl-2 opacity-50 line-through">
                      {product.discountedPrice}
                    </span>
                  </p>
                  <div className="flex items-center">
                    <RenderStars stars={product.stars} />
                    <span className="opacity-50">{`(${product.numOfReviews})`}</span>
                  </div>
                </div>
              </di>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default LikePage;
