import { useState, useEffect } from "react";
import { useCart } from "../context/ContextCart";
import { useLike } from "../context/ContextLike";
import axios from "axios";
import { USER_LOGIN_FEATURE } from "../config/featureFlags";

// Importing React Icons
import { FaSignOutAlt } from "react-icons/fa";
import { Sidebar, SidebarToggleButton } from "../components/sidebar";

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
  const [isOpen, setIsOpen] = useState(false);
  const [showItem, setShowItem] = useState(false);

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

  function showDrop() {
    console.log("Clicked");
    if (showItem === true) setShowItem(false);
    if (showItem === false) setShowItem(true);
  }

  return (
    <div className="sticky top-0 z-10 md:border-b md:border-b-[#02020226] bg-white">
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

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className="hidden md:block bg-black text-sm md:bg-yellow-500 lg:bg-black py-4 text-white text-center ">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
        <span className="underline">Shop now</span>
      </div>
      <nav className="mobile bg-white py-2 md:hidden ">
        <div className="pl-4 text-3xl font-bold bg-white py-4 flex justify-between text-black items-center">
          <a href="/">Lexus</a>
          <div className="flex w-40 pr-4 justify-between items-center">
            <button onClick={() => showDrop()}>
              <img src="search-icon.png" alt="Search icon" />
            </button>
            <a href="/like">
              <div className="relative h-5 ">
                <img
                  src="heart-icon.png"
                  alt="Heart Icon"
                  className=" md:block float-right "
                />
                {getLikeItemsCount() !== 0 && (
                  <span className=" bg-[#db4444] text-white flex absolute justify-center w-5 h-5 text-sm rounded-full items-center bottom-2 left-3">
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
                  className="md:block float-right"
                />
                {getCartItemsCount() !== 0 && (
                  <span className=" bg-[#db4444] text-white flex absolute justify-center w-5 h-5 text-sm rounded-full items-center -top-2 left-4 ">
                    <span>{getCartItemsCount()}</span>
                  </span>
                )}
              </div>
            </a>

            {USER_LOGIN_FEATURE && (
              <SidebarToggleButton
                onClick={() => setIsOpen(true)}
                isLoggedIn={isLoggedIn}
              />
            )}
          </div>
        </div>
        {showItem && (
          <div className="flex border border-gray-400 rounded-full justify-between items-center md:bg-gray-100  py-2 mx-2  px-2 md:focus-within:outline-2 focus-within:outline-black">
            <input
              type="text"
              placeholder="What are you looking for? "
              className="focus:outline-none text-sm"
              onChange={changeText}
              value={searchTerm}
            />
            <button
              type="button"
              className="bg-transparent border-0 cursor-pointer"
              disabled={isDisabled}
              onClick={() => sendSearchQuery(searchTerm)}
            >
              <img src="search-icon.png" alt="Search icon" />
              {/* Search icon */}
            </button>
            {filteredItems.length > 0 && showItem && (
              <div className="absolute z-20 w-full top-full left-0 bg-white text-black px-4 md:px-6 max-w-[1230px] p-3 border-t border-gray-300">
                <div className="w-full border rounded-lg overflow-hidden max-h-[350px] overflow-y-auto">
                  {/* Table Header */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 bg-gray-100 font-semibold text-center p-3 border-b text-sm md:text-base sticky top-0 z-10 bg-gray-100">
                    <div>Product</div>
                    <div>Price</div>
                    <div className="hidden sm:block">Stock</div>
                    <div className="hidden md:block">Action</div>
                  </div>

                  {/* Table Body */}
                  {filteredItems.map((item) => (
                    <div
                      key={item._id}
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center text-center border-b p-3 hover:bg-gray-50 text-sm"
                    >
                      {/* Product */}
                      <div className="flex items-center gap-3 justify-start">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded"
                        />
                        <a
                          href={`/product/${item._id}`}
                          className="text-left truncate"
                        >
                          {item.name}
                        </a>
                      </div>

                      {/* Price */}
                      <div>{item.price}$</div>

                      {/* Stock */}
                      <div className="hidden sm:block">
                        <span className="text-green-500">In stock</span>
                      </div>

                      {/* Action */}
                      <div className="hidden md:block">
                        <button
                          className="bg-black text-white px-3 py-1.5 rounded-md hover:opacity-70 cursor-pointer"
                          onClick={() => handleAddToCart(item)}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </nav>

      <nav className="py-0 hidden mx-auto relative max-w-[1230px] md:flex justify-between items-center px-7.5 md:py-3.5 bg-white">
        {filteredItems.length > 0 && (
          <div className="absolute hidden md:block z-20 w-full top-full left-0 bg-white text-black px-4 md:px-6 max-w-[1230px] p-3 border-t border-gray-300">
            <div className="w-full border rounded-lg overflow-hidden max-h-[350px] overflow-y-auto">
              {/* Table Header */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 bg-gray-100 font-semibold text-center p-3 border-b text-sm md:text-base sticky top-0 z-10 ">
                <div>Product</div>
                <div>Price</div>
                <div className="hidden sm:block">Stock</div>
                <div className="hidden md:block">Action</div>
              </div>

              {/* Table Body */}
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center text-center border-b p-3 hover:bg-gray-50 text-sm"
                >
                  {/* Product */}
                  <div className="flex items-center gap-3 justify-start">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <a
                      href={`/product/${item._id}`}
                      className="text-left truncate"
                    >
                      {item.name}
                    </a>
                  </div>

                  {/* Price */}
                  <div>{item.price}$</div>

                  {/* Stock */}
                  <div className="hidden sm:block">
                    <span className="text-green-500">In stock</span>
                  </div>

                  {/* Action */}
                  <div className="hidden md:block">
                    <button
                      className="bg-black text-white px-3 py-1.5 rounded-md hover:opacity-70 cursor-pointer"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
          {USER_LOGIN_FEATURE && (
            <>
              <li>
                <a href="/signup">Sign in</a>
              </li>
              <li>
                <a href="/login">Log in</a>
              </li>
            </>
          )}

          <li>{/* <a href="/admin">Admin</a> */}</li>
        </ul>

        <div className="flex gap-4 items-center">
          <div className="hidden md:flex bg-white mr-0  items-center md:bg-gray-100 rounded-md py-1 px-2 md-mr-5 md:focus-within:outline-2 focus-within:outline-black">
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
              className="bg-transparent border-0 cursor-pointer"
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
            className="text-xl pointer hover:text-[#ff9900]"
            onClick={toggleDropdown}
          >
            {USER_LOGIN_FEATURE && (
              <img
                src={isLoggedIn ? "user-active.png" : "user-icon.png"}
                alt="User Icon"
                className={
                  isLoggedIn
                    ? "hidden md:block rounded-full bg-[#DB4444] cursor-pointer"
                    : "hidden md:block cursor-pointer"
                }
              />
            )}
          </div>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="z-10 text-white top-[78%] absolute right-[2%] bg-black border rounded-md  ">
            <ul className="m-0 py-2 px-5  pointer">
              {!isLoggedIn ? (
                <a href="/login" className="no-underline">
                  <li className="flex items-center space-x-2 text-white cursor-pointer list-none transition-colors duration-300 hover:text-[#ff9900]">
                    <FaSignOutAlt className="text-lg" />
                    <p className="m-0 font-medium">Login</p>
                  </li>
                </a>
              ) : (
                <li
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-white cursor-pointer list-none transition-colors duration-300 hover:text-[#ff9900]"
                >
                  <FaSignOutAlt className="text-lg" />{" "}
                  <p className="m-0 font-medium">Logout</p>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
