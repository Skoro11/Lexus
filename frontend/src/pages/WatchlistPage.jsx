import { useWatchlist } from "../context/ContextWatchlist"; // Adjust the import path accordingly
import { useCart } from "../context/ContextCart"; // Import for cart functionality
import GetTag from "../components/Tags";
import RenderStars from "../components/RenderStars";
import "../styles/WatchlistPage.css"; // Adjusted CSS file for Watchlist styling
import { FaTrashAlt } from "react-icons/fa";
import { useState,useEffect} from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



const WatchlistPage = () => {
  const { watchlist, clearWatchlist, addToWatchlist, getWatchlistItemsCount,APIwatchList } =
    useWatchlist(); // Destructure functions and state from watchlist context
  const { addToCart, moveAllToCart } = useCart(); // Get the cart functions
  const [filteredItems, setFilteredItems]=useState([]);
    const {isLoggedIn, setIsLoggedIn} = useAuth()
  
    const [hasFetchedAPIList, setHasFetchedAPIList] = useState(false);
  // Function to handle adding all items to the cart and removing from watchlist
  const handleMoveAllToCart = () => {

    console.log(APIwatchList)
      APIwatchList.forEach((item)=>{
        console.log("Item",item)
        addToCart(item)
      })


    moveAllToCart(watchlist, addToCart, addToWatchlist);
    clearWatchlist(); // Move all items from watchlist to cart and clear watchlist
     setFilteredItems([])
  };

  const handleAddToCart = (product) => {
    addToCart(product); // Add the product to the cart
    addToWatchlist(product); // Remove the product from the watchlist
  };

useEffect(()=>{
    
    async function filteredProducts(){
        if(isLoggedIn){
          
         const itemIds= APIwatchList.map(item => item._id)
          if (itemIds.length === 0) {
          setFilteredItems([]);
          return;
        }
         try{
            const response = await axios.post(`${API_BASE_URL}/api/watchlist/id`,
          {ids:itemIds},
        {withCredentials:true})
        setFilteredItems(response.data.foundedItems || []);
         }catch(error){
            console.log("Error with axios Watchlistpage /watchlist/id " +error)
            setFilteredItems([]);
         }
        }else{
          setFilteredItems(watchlist)
        }
        
  }
filteredProducts()

   },[APIwatchList,isLoggedIn,watchlist])
    
let list=filteredItems

  return (
    <div className="width-1170 mg-inline pd-in-30p pd-in-15-mb">
      <div className="watchlist-header">
        <span className="watchlist-items">
          Watchlist ({getWatchlistItemsCount()})
        </span>
        {/* Button to move all items to the cart */}
        <button className="all-bag-btn" onClick={handleMoveAllToCart}>
          Move All To Bag
        </button>
      </div>
      <div className="container-watchlist">
        {list.length === 0 ? (
          <h3>Your watchlist is empty.</h3>
        ) : (
          list.map((product) => (
            <div className="watchlist-item" key={product.id}>
              <div className="relative product-margin">
                <img
                  className="watchlist-image"
                  src={product.image}
                  alt={product.name}
                />
                <div className="product-tag">{GetTag(product.tag)}</div>

                {/* Add to Cart button with logic to remove from watchlist */}
                <button
                  className="add-cart"
                  onClick={() => handleAddToCart(product)} // Handle add to cart and remove from watchlist
                >
                  Add To Cart
                </button>

                {/* Remove button for removing from the watchlist */}
                <FaTrashAlt
                  className="remove"
                  onClick={() => addToWatchlist(product)} // Remove from watchlist when clicked
                />
              </div>

              <span className="product-name-watchlist">{product.name}</span>
              <p className="product-description-watchlist">
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
          ))
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;
