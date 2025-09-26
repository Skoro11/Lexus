import { createContext, useState, useContext, useEffect } from "react";
import { VscChevronUp, VscChevronDown, VscClose } from "react-icons/vsc";

// Create Context
const CartContext = createContext();

// CartProvider Component to wrap the root of the app (or part of the component tree)
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for fetch
  const [showPopup, setShowPopup] = useState(false); // Popup visibility state

  useEffect(() => {
    let timer;
    if (showPopup) timer = setTimeout(() => setShowPopup(false), 6000);
    return () => clearTimeout(timer);
  }, [showPopup]);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("guest_cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("guest_cart", JSON.stringify(cart));
    } else {
      // Cart is empty, store 0 or clear it
      localStorage.removeItem("guest_cart");
      // Or you can just remove it completely
      // localStorage.removeItem("guest_cart");
    }
  }, [cart]);

  // Add product to the cart
  async function addToCart(product) {
    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
      // Only update the cart if the product is already there
      existingProduct.quantity += 1;
      setCart([...cart]); // Update cart state
    } else {
      // Add a new product with quantity set to 1
      product.quantity = 1;
      setCart([...cart, product]);
    }

    // Show the popup when an item is added
    setShowPopup(true);

    // Hide the popup after 3 seconds
    setTimeout(() => setShowPopup(false), 6000);
  }

  // Remove product from the cart

  async function removeFromCart(productId) {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
  }

  const moveAllToCart = (likeList, addToCart, addToLike) => {
    let updatedCart = [...cart];

    // Add all items from likeList to the cart and remove them from the likeList
    likeList.forEach((product) => {
      // Check if product is already in the cart
      const existingProduct = updatedCart.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        // If product already exists in cart, increase its quantity
        existingProduct.quantity += 1;
      } else {
        // If it's a new product, add it with quantity 1
        product.quantity = 1;
        updatedCart.push(product);
      }

      // Remove the product from the like list
      addToLike(product); // This will now be done for every product
    });

    // Update the cart state with the new items
    setCart(updatedCart);
  };

  // Update quantity of a product in the cart
  async function updateQuantity(productId, action) {
    //Updates global cart variable
    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        if (action === "add") item.quantity += 1;
        if (action === "subtract" && item.quantity > 1) item.quantity -= 1;
      }
      return item;
    });

    //If the user is logged in it also sends API requests

    setCart(updatedCart);
  }

  // Clear the cart
  async function clearCart() {
    localStorage.removeItem("guest_cart");

    setCart([]);
  }

  // Get total items count
  const getCartItemsCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Function to calculate the total price of items in the cart
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => {
        // Check if item.price is a string and remove the dollar sign if so, or use it directly if it's a number
        const price =
          typeof item.price === "string"
            ? parseFloat(item.price.replace("$", ""))
            : item.price;
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  // Function to show the items inside the cart (HTML/JSX representation)
  const showCartItems = () => {
    if (cart.length === 0) {
      return (
        <tbody>
          <tr>
            <td className="text-xl py-3">Your cart is empty</td>
          </tr>
        </tbody>
      );
    }
    return (
      <tbody>
        {cart.map((item) => (
          <tr key={item._id}>
            <td className="border-gray-400 border-1 border-r-0 p-3.5 rounded-l-2xl relative min-h-22 flex items-center ">
              <VscClose
                className="pointer hover:opacity-50 bg-red-500 text-white rounded-full w-5 h-auto absolute top-[13%] left-[9%]"
                onClick={() => removeFromCart(item._id)}
              />
              <img className="max-w-1/10" src={item.image}></img>
              <span className="pl-10">{item.name}</span>
            </td>
            <td className="px-4 border-t border-b border-gray-400 ">
              ${item.price}
            </td>
            <td className="px-4 border-t border-b border-gray-400">
              <div className="flex items-center border w-fit rounded-xl">
                <span className="m-2 w-3">{item.quantity}</span>
                <span className="flex flex-col cursor-pointer">
                  <VscChevronUp
                    className="pointer w-6"
                    onClick={() => updateQuantity(item._id, "add")}
                  />
                  <VscChevronDown
                    className="pointer w-6"
                    onClick={() => updateQuantity(item._id, "subtract")}
                    disabled={item.quantity === 1}
                  />
                </span>
              </div>
            </td>

            <td className="px-4 border border-gray-400 rounded-r-2xl border-l-0">
              $
              {(
                (typeof item.price === "string"
                  ? parseFloat(item.price.replace("$", ""))
                  : item.price) * item.quantity
              ).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  const ShowCartItemsMobile = () => {
    if (cart.length === 0) {
      return <div className="mx-4">Your cart is empty</div>;
    }
    return (
      <div className="">
        {cart.map((item) => (
          <div className="mb-7 mx-4" key={item._id}>
            <div>
              <img className="w-full" src={item.image} />
              <div className="text-sm">
                <div className="mt-2">{item.name}</div>

                <div className="my-1 text-base font-bold">{item.price}$</div>
                <div className="mb-1 text-green-600">In Stock</div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between ">
                <div className="flex justify-between items-center w-1/2 ">
                  <button
                    onClick={() => updateQuantity(item._id, "subtract")}
                    className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition duration-200"
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    onClick={() => updateQuantity(item._id, "add")}
                    className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition duration-200"
                  >
                    +
                  </button>
                </div>
                <div className="buttons-section description-section">
                  <button
                    className="border px-3 py-1 rounded bg-red-500 text-white"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-23">
          <div className="py-4 fixed bottom-0 flex items-center justify-center bg-black w-full text-white">
            <a href="/checkout">Go to Checkout</a>
          </div>
        </div>
      </div>
    );
  };

  const showCartItemsMinimal = () => {
    if (cart.length === 0) {
      return <div className="mx-4">Your cart is empty</div>;
    }
    return (
      <div className="">
        {cart.map((item) => (
          <div className="" key={item._id}>
            <div className="flex items-center mb-2 ">
              <img
                className=" w-1/5 object-contain pr-5"
                src={item.image}
                alt={item.name}
              />
              <div>{item.name}</div>
            </div>

            <div></div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartItemsCount,
        calculateTotal,
        showCartItems,
        ShowCartItemsMobile,
        moveAllToCart,
        showCartItemsMinimal,
        loading, // Pass loading state to the consumers
      }}
    >
      {children}

      {/* Popup for adding to cart */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <img alt="Checkmark" src="checkmark.png" />
            <p>Item added to the cart!</p>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};

// Custom hook to access the Cart context
export const useCart = () => {
  return useContext(CartContext);
};
