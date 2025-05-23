import { createContext, useState, useContext, useEffect } from "react";
import { VscChevronUp, VscChevronDown, VscClose } from "react-icons/vsc";

// Create Context
const CartContext = createContext();

// CartProvider Component to wrap the root of the app (or part of the component tree)
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for fetch
  const [showPopup, setShowPopup] = useState(false); // Popup visibility state

  // Fetch the cart items from the backend
  const fetchCartItems = async () => {
    try {
      const response = await fetch("/api/cart"); // Replace with your backend endpoint
      const data = await response.json();

      if (data && Array.isArray(data)) {
        setCart(data);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
    // Fetch the cart from the backend after loading localStorage data
    fetchCartItems();
  }, []);

  // Update localStorage whenever the cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart"); // Remove from localStorage if cart is empty
    }
  }, [cart]);

  // Add product to the cart
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
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
  };

  // Remove product from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const moveAllToCart = (likeList, addToCart, addToLike) => {
    let updatedCart = [...cart];

    // Add all items from likeList to the cart and remove them from the likeList
    likeList.forEach((product) => {
      // Check if product is already in the cart
      const existingProduct = updatedCart.find(
        (item) => item.id === product.id
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
  const updateQuantity = (productId, action) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        if (action === "add") item.quantity += 1;
        if (action === "subtract" && item.quantity > 1) item.quantity -= 1;
      }
      return item;
    });
    setCart(updatedCart);
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Get total items count
  const getCartItemsCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Function to calculate the total price of items in the cart
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => {
        // Check if item.price is a string and remove the dollar sign if so, or use it directly if it's a number
        const price = typeof item.price === 'string' 
          ? parseFloat(item.price.replace("$", "")) 
          : item.price;  
        return total + price * item.quantity;
      }, 0)
      .toFixed(2); // Round to two decimal places
  };
  

  // Function to show the items inside the cart (HTML/JSX representation)
  const showCartItems = () => {
    if (cart.length === 0) {
      return (
        <tbody>
          <tr className="cart-product-row">
            <td className="empty-cart">Your cart is empty</td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {cart.map((item) => (
          <tr className="cart-product-row" key={item.id}>
            <td className="table-data first-element photo-item">
              <VscClose
                className="x-icon"
                onClick={() => removeFromCart(item.id)}
              />
              <img className="cart-row-image" src={item.image}></img>
              <span className="text">{item.name}</span>
            </td>
            <td className="table-data">${item.price}</td>
            <td className="table-data">
              <div className="operation-box">
                <span className="quantity-box">{item.quantity}</span>
                <span className="operations-quantity">
                  <VscChevronUp
                    className="operation-btn"
                    onClick={() => updateQuantity(item.id, "add")}
                  />
                  <VscChevronDown
                    className="operation-btn"
                    onClick={() => updateQuantity(item.id, "subtract")}
                    disabled={item.quantity === 1}
                  />
                </span>
              </div>
            </td>

            <td className="table-data last-element">
              $ 
              {
  (
    (typeof item.price === 'string'
      ? parseFloat(item.price.replace("$", ""))
      : item.price) * item.quantity
  ).toFixed(2)
}
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  const ShowCartItemsMobile = () => {
    if (cart.length === 0) {
      return <div className="empty-cart">Your cart is empty</div>;
    }
    return (
      <div>
        {cart.map((item) => (
          <div className="product-card-mobile" key={item.id}>
            <div className="product-container-mobile">
              <img src={item.image} />
              <div className="description-section">
                <div>{item.name}</div>
                <div className="category-mobile">{item.category}</div>
                <div className="price-mobile">{item.price}</div>
                <div className="shipping-info">Eligable for Free Shipping</div>
                <div className="stock-mobile">In stock</div>
              </div>
            </div>

            <div>
              <div className="flex padding-top">
                <div className="image-section-mobile">
                  <span
                    onClick={() => updateQuantity(item.id, "subtract")}
                    className="operation-btn-mobile"
                  >
                    -
                  </span>
                  {item.quantity}
                  <span
                    onClick={() => updateQuantity(item.id, "add")}
                    className="operation-btn-mobile"
                  >
                    +
                  </span>
                </div>
                <div className="buttons-section description-section">
                  <button
                    className="delete-btn-mobile"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
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
        loading, // Pass loading state to the consumers
      }}
    >
      {children}

      {/* Popup for adding to cart */}
      {showPopup && (
  <div className="popup">
    <div className="popup-content">
      
      <img alt ="Checkmark" src="checkmark.png" />
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
