import { useState } from "react";
import Navbar from "./sections/Navbar"; // Import Navbar
import Carousel from "./components/Carousel"; // Import Carousel
import Cart from "./components/Cart"; // Import Cart
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "./components/Cart";

function AppTest() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setCart([...cart]); // Trigger re-render after adding item
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    setCart([...cart]); // Trigger re-render after removing item
  };

  const handleUpdateQuantity = (productId, action) => {
    updateQuantity(productId, action);
    setCart([...cart]); // Trigger re-render after updating quantity
  };

  const handleClearCart = () => {
    clearCart();
    setCart([]); // Clear cart and trigger re-render
  };

  return (
    <div>
      <Navbar cart={cart} /> {/* Pass cart to Navbar */}
      <Carousel
        handleAddToCart={handleAddToCart}
        cart={cart}
        handleUpdateQuantity={handleUpdateQuantity}
        handleRemoveFromCart={handleRemoveFromCart}
      />
      <Cart
        cart={cart}
        handleRemoveFromCart={handleRemoveFromCart}
        handleUpdateQuantity={handleUpdateQuantity}
        handleClearCart={handleClearCart}
      />
    </div>
  );
}

export default AppTest;
