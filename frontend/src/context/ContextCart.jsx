import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

// Create Context
const CartContext = createContext();

// CartProvider Component to wrap the root of the app (or part of the component tree)
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("guest_cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  //Set guest_cart if the cart has at least one item or remove it if it is empty
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("guest_cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("guest_cart");
    }
  }, [cart]);

  // Add product to the cart
  function addToCart(product) {
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      // Increment quantity for existing product
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new product with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  // Remove product from the cart

  function removeFromCart(product_id) {
    const updatedCart = cart.filter((item) => item._id !== product_id);
    setCart(updatedCart);
  }

  function moveAllToCart(likeList, removeFromLike) {
    setCart((prevCart) => {
      const newCart = [...prevCart];

      likeList.forEach((product) => {
        const cartItem = newCart.find((item) => item._id === product._id);

        if (cartItem) {
          cartItem.quantity += 1; // increment quantity if already in cart
        } else {
          newCart.push({ ...product, quantity: 1 }); // add new product
        }

        removeFromLike(product); // remove from like list
      });

      return newCart;
    });
  }

  // Update quantity of a product in the cart
  function updateQuantity(productId, action) {
    const updatedCart = cart.map((item) => {
      if (item._id !== productId) return item; // leave other items unchanged

      if (action === "add") {
        return { ...item, quantity: item.quantity + 1 }; // create new object
      }

      if (action === "subtract" && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 }; // create new object
      }

      return item; // if subtract but quantity is 1, leave unchanged
    });

    setCart(updatedCart);
  }

  // Clear the cart
  function clearCart() {
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
        moveAllToCart,

        // Pass loading state to the consumers
      }}
    >
      {children}

      {/* Popup for adding to cart */}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.array,
};
// Custom hook to access the Cart context
export const useCart = () => {
  return useContext(CartContext);
};
