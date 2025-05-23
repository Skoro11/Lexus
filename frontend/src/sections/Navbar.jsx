import "../styles/Navbar.css";
import { useState,useEffect } from "react";
import { useCart } from "../context/ContextCart";
import { useLike } from "../context/ContextLike";
import { products } from "../components/Products";
import { useLocation } from "react-router-dom";
// Importing React Icons
import {
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {

  // State to toggle dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]); // State for filtered items
  const [showSearchResults, setShowSearchResults] = useState(false); // State to control search result visibility
  
  const { getCartItemsCount, addToCart } = useCart();
  const { getLikeItemsCount } = useLike();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [notification, setNotification] = useState(""); // Store notification message
  const [notificationType, setNotificationType] = useState(""); 
  useEffect(() => {
    // Check if user is logged in based on the localStorage
    const loggedInStatus = localStorage.getItem("loggedIn");
    setIsLoggedIn(loggedInStatus === "true"); // Set state based on the loggedIn value
  }, []);

  // Store notification type (success/error)

  useEffect(() => {
    // Check if there's a notification in sessionStorage
    const message = sessionStorage.getItem("notification");
    const type = sessionStorage.getItem("notificationType");

    if (message) {
      setNotification(message);
      setNotificationType(type);

      // Remove notification from sessionStorage after showing it
      sessionStorage.removeItem("notification");
      sessionStorage.removeItem("notificationType");
    }
  }, []);
  useEffect(() => {
    // Check if there is a logout message stored in sessionStorage
    const message = sessionStorage.getItem("logoutMessage");
    if (message) {
      setLogoutMessage(message);
      // Optionally, remove the message after 5 seconds
      setTimeout(() => {
        setLogoutMessage("");
        sessionStorage.removeItem("logoutMessage");
      }, 6000);
    }
  }, []);

  const handleLogout = () => {
    // Remove the 'loggedIn' flag from localStorage
    localStorage.removeItem("loggedIn");
    
    // Store the logout message in sessionStorage to display it after reload
    sessionStorage.setItem("logoutMessage", "You have logged out!");

    // Optionally, reload the page after a delay to simulate a logout effect
    
      window.location.reload();
     // Wait 2 seconds before reload
  };


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Reset the filtered items if the search term is cleared
    if (event.target.value === "") {
      setFilteredItems([]);
      setShowSearchResults(false); // Hide search results when search bar is empty
    }
  };

  const handleSearchClick = () => {
    // If the search term is empty, do nothing
    if (searchTerm === "") {
      setShowSearchResults(false);
      return;
    }

    setShowSearchResults(true); // Show search results if there is a search term

    // Filter items based on search term
    const results = products.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(results);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  
  const handleAddToCart = (item) => {
    addToCart(item); // Add the product to the cart
    showPopup(); // Show the popup
  };

  return (
    
    <div className="navbar">
      {logoutMessage && (
        <div className="popup">
        <div className="popup-content">
          {logoutMessage}
        </div>
        </div>
        
      )}
       {/* Notification Container */}
       {notification && (
        <div className={`popup ${notificationType}`}>
          <img 
            src= "checkmark.png" 
            alt="Notification Icon" 
          />
          {notification}
        </div>
      )}
      <div className="sale">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
        <span className="underlined">Shop now</span>
      </div>
      <div className="bordered">
        {showSearchResults && searchTerm !== "" && (
          <div className="search-results">
            {filteredItems.length > 0 ? (
              <ul>
                <div className="cart-table">
                  <table className="cart-table">
                    <thead>
                      <tr className="cart-product-row">
                        <th className="">Product</th>
                        <th className="price-column">Price</th>
                        <th className="quantity-column">Stock</th>
                        <th className="">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.length > 0 ? (
                        filteredItems.map(item => (
                          <tr key={item.id} className="cart-product-row">
                            <td className="">
                              <div className="flex align-center">
                                <img className="width-10 padding-right-5" src={item.image} alt={item.name} />
                                <div><a href={`/product/${item.slug}/${item.id}`}>{item.name}</a></div>
                              </div>
                            </td>
                            <td className="price-column">{item.price}$</td>
                            <td className="quantity-column">
                              <span className="green">In stock</span>
                            </td>
                            <td className="">
                              <button
                                className="bg-black"
                                onClick={() => handleAddToCart(item)} // Add the product to the cart and show popup
                              >
                                Add To Cart
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr className="cart-product-row">
                          <td >No items found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </ul>
            ) : (
              <p>No items found</p>
            )}
          </div>
        )}

        <div className="navbar__logo">
          <h1>
            <a href="/">Lexus</a>
          </h1>
        </div>

        <ul className="navbar__links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/login">Sign in</a>
          </li>
          <li>
            <a href="/admin">Admin</a>
          </li>
        </ul>

        <div className="navbar__right">
          <div className="navbar__search">
            <input
              type="text"
              placeholder="What are you looking for? "
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              type="button"
              className="search-btn"
              onClick={handleSearchClick} // Handle search button click
            >
              <img src="search-icon.png" alt="Search icon" />
              {/* Search icon */}
            </button>
          </div>

          {/* Display Search Results only when the search button is clicked and search term is not empty */}
          <a href="/like">
            <div className="navbar__heart">
              <img
                src="heart-icon.png"
                alt="Heart Icon"
                className="navbar__icon"
              />
              {getLikeItemsCount() !== 0 && (
                <span className="popup-item-number heart-popup desktop-item">
                  <span>{getLikeItemsCount()}</span>
                </span>
              )}
            </div>
          </a>

          <a href="/cart">
            <div className="navbar__cart">
              <img
                src="cart-icon.png"
                alt="Shopping Cart Icon"
                className="navbar__icon"
              />
              {getCartItemsCount() !== 0 && (
                <span className="popup-item-number desktop-item">
                  <span>{getCartItemsCount()}</span>
                </span>
              )}
            </div>
          </a>

          <div
  className={`navbar__user-icon `}
  onClick={toggleDropdown}
>
<img
  src={isLoggedIn ? "user-active.png" : "user-icon.png"}
  alt="User Icon"
  className={isLoggedIn ? "user-active" : "navbar__icon"} 
/>


</div>

        </div>

       

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="navbar__dropdown">
            <ul>
              
              
            {!isLoggedIn ? (
         <a className="color-white" href="/login"><li style={{ cursor: "pointer" }}>
         <FaSignOutAlt /> Login
       </li></a>
         
        ) : (
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            <FaSignOutAlt /> Logout
          </li>
        )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
