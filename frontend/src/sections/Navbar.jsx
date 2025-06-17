import "../styles/Navbar.css";
import { useState,useEffect } from "react";
import { useCart } from "../context/ContextCart";
import { useLike } from "../context/ContextLike";
import axios from "axios"
// Importing React Icons
import {
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {

  // State to toggle dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]); // State for filtered items
  const [isDisabled, setIsDisabled] = useState(false)
  const { getCartItemsCount, addToCart } = useCart();
  const { getLikeItemsCount } = useLike();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [notification, setNotification] = useState(""); // Store notification message
  const [notificationType, setNotificationType] = useState(""); 
  const [user,setUser] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function changeText(event){
  setSearchTerm(event.target.value)
}


async function sendSearchQuery(searchTerm){
  setIsDisabled(true)
const response = await axios.post(`${API_BASE_URL}api/product?search=` + searchTerm)

    setFilteredItems(response.data.filteredProducts)
  setIsDisabled(false)
}


useEffect(() => {
  async function fetchData() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.id) {
        setUser(data);
        console.log(data.id)
        setIsLoggedIn(true)
      }else {
        setIsLoggedIn(false);
      }
// Correctly logging the parsed data
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  fetchData();
}, []);


  const handleLogout = async () => {
    
     const response= await fetch(`${API_BASE_URL}/api/auth/logout`,{
        method:"DELETE",
        credentials: "include",
      })
      window.location.reload();

      if (response.ok) {
    // Successfully logged out
    window.location.reload();
  } else {
    console.error("Logout failed");
  }

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


      <div className="bg-black text-sm md:bg-yellow-500 lg:bg-black py-4 text-white text-center ">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
        <span className="underline">Shop now</span>
      </div>

      <div className="mx-auto relative max-w-[1230px] flex justify-between items-center px-7.5 py-3.5 bg-white">
       {filteredItems.length > 0  ? (
  <div className="search-results">
    <div className="cart-table">
      <table className="cart-table">
        <thead>
          <tr className="cart-product-row">
            <th>Product</th>
            <th className="price-column">Price</th>
            <th className="quantity-column">Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr key={item._id} className="cart-product-row">
              <td>
                <div className="flex align-center">
                  <img src={item.image} className="width-10 padding-right-5" alt={item.name} />
                  <div>
                    <a href={`/product/${item._id}`}>{item.name}</a>
                  </div>
                </div>
              </td>
              <td className="price-column">{item.price}$</td>
              <td className="quantity-column">
                <span className="green">In stock</span>
              </td>
              <td>
                <button
                  className="bg-black"
                  onClick={() => handleAddToCart(item)}
                >
                  Add To Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
) : (
  <div className="search-results"  style={{ display: filteredItems.length === 0 ? "none" : "block" }}>
    No products
  </div>
)}



        <div className="navbar__logo">
          <h1 className="text-3xl font-bold">
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
            <a href="/signup">Sign in</a>
          </li>
          <li>
            <a href="/login">Log in</a>
          </li>
          <li>
            {/* <a href="/admin">Admin</a> */}
          </li>
        </ul>

        <div className="navbar__right">
          <div className="navbar__search">
            <input
              type="text"
              placeholder="What are you looking for? "
              className="search-input"
              onChange={changeText}
              onKeyDown={(e)=>{
                if(e.key ==="Enter")sendSearchQuery(searchTerm)
              }}
              value={searchTerm}
            />
            <button
              type="button"
              className="search-btn"
              disabled={isDisabled}
              onClick={() => sendSearchQuery(searchTerm)
              
              }
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
