import { useState, useEffect } from "react";
import { useCart } from "../context/ContextCart";
import { useLike } from "../context/ContextLike";
import axios from "axios";

// Importing React Icons
import { FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  // State to toggle dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]); // State for filtered items
  const [isDisabled, setIsDisabled] = useState(false);
  const { getCartItemsCount, addToCart } = useCart();
  const { getLikeItemsCount } = useLike();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [notification, setNotification] = useState(""); // Store notification message
  const [notificationType, setNotificationType] = useState("");
  const [user, setUser] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  function changeText(event) {
    setSearchTerm(event.target.value);
  }

  async function sendSearchQuery(searchTerm) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/product?search=` + searchTerm
      );
      setFilteredItems(response.data.filteredProducts);
    } catch (error) {
      console.log("Search query", error);
    }
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
          console.log(data.id);
          setIsLoggedIn(true);
        } else {
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
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "DELETE",
      credentials: "include",
    });
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
    <div className="sticky top-0 z-10 border-b border-b-[#02020226]">
      {logoutMessage && (
        <div className="popup">
          <div className="popup-content">{logoutMessage}</div>
        </div>
      )}
      {/* Notification Container */}
      {notification && (
        <div className={`popup ${notificationType}`}>
          <img src="checkmark.png" alt="Notification Icon" />
          {notification}
        </div>
      )}

      <div className="hidden md:block bg-black text-sm md:bg-yellow-500 lg:bg-black py-4 text-white text-center ">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
        <span className="underline">Shop now</span>
      </div>
      <div className="md:hidden text-center text-3xl font-bold bg-black py-4 text-white">
        Lexus
      </div>
      <div className="mx-auto relative max-w-[1230px] flex justify-between items-center px-7.5 py-3.5 bg-white">
        {filteredItems.length > 0 ? (
          <div className="absolute w-full top-full bg-white text-black max-w-[1170px]  p-3 border-t-1 border-t-[#02020226] ">
            <div>
              <table className="w-full">
                <thead>
                  <tr className="">
                    <th>Product</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item._id}>
                      <td className="text-center w-2/5">
                        <div className="flex items-center">
                          <img
                            src={item.image}
                            className="w-20 pr-3 "
                            alt={item.name}
                          />
                          <div>
                            <a href={`/product/${item._id}`}>{item.name}</a>
                          </div>
                        </div>
                      </td>
                      <td className="text-center w-1/4">{item.price}$</td>
                      <td className="text-center w-1/4">
                        <span className="text-green-500">In stock</span>
                      </td>
                      <td className="text-center w-1/4">
                        <button
                          className="bg-black text-white p-1.5 rounded-md pointer hover:opacity-70"
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
          <div
            className="search-results"
            style={{ display: filteredItems.length === 0 ? "none" : "block" }}
          >
            No products
          </div>
        )}

        <div className="hidden md:block">
          <h1 className="text-3xl font-bold">
            <a href="/">Lexus</a>
          </h1>
        </div>

        <ul className="hidden list-none lg:flex gap-4">
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
          <li>{/* <a href="/admin">Admin</a> */}</li>
        </ul>

        <div className="flex gap-4 items-center">
          <div className=" bg-white mr-0 flex items-center md:bg-gray-100 rounded-md py-1 px-2 md-mr-5 md:focus-within:outline-2 md:focus-within:outline-2 focus-within:outline-black">
            <input
              type="text"
              placeholder="What are you looking for? "
              className="focus:outline-none p-2 text-sm"
              onChange={changeText}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendSearchQuery(searchTerm);
              }}
              value={searchTerm}
            />
            <button
              type="button"
              className="bg-transparent border-0 pointer"
              disabled={isDisabled}
              onClick={() => sendSearchQuery(searchTerm)}
            >
              <img src="search-icon.png" alt="Search icon" />
              {/* Search icon */}
            </button>
          </div>

          {/* Display Search Results only when the search button is clicked and search term is not empty */}
          <a href="/like">
            <div className="relative h-5">
              <img
                src="heart-icon.png"
                alt="Heart Icon"
                className="hidden md:block"
              />
              {getLikeItemsCount() !== 0 && (
                <span className="hidden bg-[#db4444] text-white absolute md:flex justify-center w-6 h-6 rounded-full bottom-3 left-2.5">
                  <span>{getLikeItemsCount()}</span>
                </span>
              )}
            </div>
          </a>

          <a href="/cart">
            <div className="relative">
              <img
                src="cart-icon.png"
                alt="Shopping Cart Icon"
                className="hidden md:block"
              />
              {getCartItemsCount() !== 0 && (
                <span className="hidden bg-[#db4444] text-white absolute md:flex justify-center w-6 h-6 rounded-full bottom-3.5 left-4">
                  <span>{getCartItemsCount()}</span>
                </span>
              )}
            </div>
          </a>

          <div
            className={`text-xl pointer hover:text-[#ff9900]`}
            onClick={toggleDropdown}
          >
            <img
              src={isLoggedIn ? "user-active.png" : "user-icon.png"}
              alt="User Icon"
              className={
                isLoggedIn ? "rounded-full bg-[#DB4444] " : "hidden md:block"
              }
            />
          </div>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="z-10 text-white top-[78%] absolute right-[2%] bg-black border rounded-md  ">
            <ul className="m-0 py-2 px-5  pointer">
              {!isLoggedIn ? (
                <a href="/login">
                  <li className="text-white flex list-none hover:text-[#ff9900] items-center">
                    <FaSignOutAlt /> <p>Login</p>
                  </li>
                </a>
              ) : (
                <li
                  onClick={handleLogout}
                  className="flex hover:text-[#444443] items-center"
                >
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
