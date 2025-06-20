import { createContext, useState, useContext, useEffect } from "react";
import { VscChevronUp, VscChevronDown, VscClose } from "react-icons/vsc";
import axios from "axios"
import { useAuth } from "./AuthContext";

// Create Context
const CartContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;





// CartProvider Component to wrap the root of the app (or part of the component tree)
export const CartProvider = ({ children }) => {
  const [APICart,setAPICart] = useState([])
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for fetch
  const [showPopup, setShowPopup] = useState(false); // Popup visibility state
  const { isLoggedIn, setIsLoggedIn } = useAuth();
 
useEffect(() => {
  async function getCartItemsAPI() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/cart/get`, {
        withCredentials: true,
      });

      // Check if response.data and userCart exist and are valid
      const items = response?.data?.userCart;
      if (items && Array.isArray(items)) {
        setAPICart(items); // Set the state only if items is a valid array
        console.log("Fetched Cart Items:", items);
      } else {
        console.warn("Cart items are undefined or not an array:", items);
        setAPICart([]); // Set to empty array or fallback value to avoid crashes
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setAPICart([]); // Fallback to empty array on error
    }
  }

  getCartItemsAPI();
}, []);



  // Load cart from localStorage when the component mounts
  useEffect(() => {
    if(!isLoggedIn){
       const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
    }

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
  async function addToCart(product){
    

    if(isLoggedIn){
        console.log("User is logged in")
     
      const response = await axios.post(
             `${API_BASE_URL}/api/cart/add`,
       {
           _id: product._id,

      },
      {
           withCredentials: true
      }
            );
            
            console.log(product)
      const data = response.data.user
          console.log("Data cart",data.cart)
          setAPICart(data.cart)
    }else{
    console.log("User is not logged in")
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
  };

  // Remove product from the cart


  const removeFromCart = (productId) => {
    console.log(productId)
    if(isLoggedIn){
       const updatedAPICart = APICart.filter((item) => item._id !== productId);
    console.log(updatedAPICart)
    setAPICart(updatedAPICart);

    async function removeItem(){
        const response = await axios.post(`${API_BASE_URL}/api/cart/remove`,
          {_id:productId},
          { withCredentials: true },

        )
        console.log(response.data.user.cart)
    }
        removeItem()
    }else{
      const updatedCart = cart.filter((item) => item._id !== productId);
    console.log(updatedCart)
    setCart(updatedCart);
    }

    
  };

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
  const updateQuantity = (productId, action) => {
    if(isLoggedIn){
      
       const updatedAPICart = APICart.map((item) => {
        console.log("Item", item._id, "Product id",productId)
       
      if (item._id === productId) {

        if (action === "add"){
                item.quantity += 1;
                async function addToCart(){
                   await axios.post(`${API_BASE_URL}/api/cart/add`,
                      {_id:item._id},
                      {withCredentials:true}
                    )
                }
                    addToCart()
        } 
        if (action === "subtract" && item.quantity > 1){
          item.quantity -= 1;
          async function SubtractItemByOne(){
            try{
                await axios.post(`${API_BASE_URL}/api/cart/subtract`,
                {_id: item._id},
                {
           withCredentials: true
      }
               )

    
              }catch(error){
                console.log("Error " +error)
              }

              
          }
SubtractItemByOne()
          
        }
      }
      return item;
    });
     console.log(updatedAPICart)
    setAPICart(updatedAPICart);
    }else{
      const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        if (action === "add") item.quantity += 1;
        if (action === "subtract" && item.quantity > 1) item.quantity -= 1;
      }
      return item;
    });
    setCart(updatedCart);
    }
    
  };

  // Clear the cart
  const clearCart = () => {
    if(isLoggedIn){
      setAPICart([])
        async function removeAllFromCartAPI() {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/cart/remove/all`,
          {}, 
          { withCredentials: true }
        );
        console.log(response);
      } catch (error) {
        console.error("Failed to clear API cart:", error);
      }
    }
      removeAllFromCartAPI()
    }else{
      setCart([]);
    }
  };

  // Get total items count
  const getCartItemsCount = () => {
    if(isLoggedIn){
              return APICart.reduce((acc, item) => acc + item.quantity, 0);

    }else{
              return cart.reduce((acc, item) => acc + item.quantity, 0);

    }
    
  };

  // Function to calculate the total price of items in the cart
  const calculateTotal = () => {
    if(isLoggedIn){

return APICart
      .reduce((total, item) => {
        // Check if item.price is a string and remove the dollar sign if so, or use it directly if it's a number
        const price = typeof item.price === 'string' 
          ? parseFloat(item.price.replace("$", "")) 
          : item.price;  
        return total + price * item.quantity;
      }, 0)
      .toFixed(2); // Round to two decimal places
       // Round to two decimal places
    }else{
      return cart
      .reduce((total, item) => {
        // Check if item.price is a string and remove the dollar sign if so, or use it directly if it's a number
        const price = typeof item.price === 'string' 
          ? parseFloat(item.price.replace("$", "")) 
          : item.price;  
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
    }
    
  };
  
  // Function to show the items inside the cart (HTML/JSX representation)
   const showCartItems = () => {

    if(isLoggedIn && APICart.length === 0){
      console.log(APICart)
       return (
        <tbody>
          <tr >
            <td className="text-xl py-3">Your cart is empty</td>
          </tr>
        </tbody>
      );

    
    
    }if(isLoggedIn && APICart.length > 0){

      return(
        <tbody>
        {APICart.map((item) => (
          
          <tr key={item._id}>
            <td className="border-gray-400 border-1 border-r-0 p-3.5 rounded-l-2xl relative min-h-22 flex items-center ">
              <VscClose
                className="pointer hover:opacity-50 bg-red-500 text-white rounded-full w-5 h-auto absolute top-[13%] left-[9%]"
                onClick={() => removeFromCart(item._id)}
              />
              <img className="max-w-1/10" src={item.image}></img>
              <span className="pl-10">{item.name}</span>
            </td>
            <td className="px-4 border-t border-b border-gray-400 ">${item.price}</td>
            <td className="px-4 border-t border-b border-gray-400">
              <div className="flex items-center border w-fit rounded-xl">
                <span className="m-2 w-3">{item.quantity}</span>
                <span className="flex flex-col">
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
      )
    }

    if (cart.length === 0) {
      return (
        <tbody>
          <tr >
            <td className="text-xl py-3">Your cart is empty</td>
          </tr>
        </tbody>
      );
    }

    if(!isLoggedIn)return (
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
            <td className="px-4 border-t border-b border-gray-400 ">${item.price}</td>
            <td className="px-4 border-t border-b border-gray-400">
              <div className="flex items-center border w-fit rounded-xl">
                <span className="m-2 w-3">{item.quantity}</span>
                <span className="flex flex-col">
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
                    onClick={() => updateQuantity(item._id, "subtract")}
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
