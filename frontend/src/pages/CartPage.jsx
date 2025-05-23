import { useCart } from "../context/ContextCart"; // Adjust the import path accordingly
import "../styles/CartPage.css";
const CartPage = () => {
  const { showCartItems, calculateTotal, clearCart, ShowCartItemsMobile } =
    useCart();

  return (
    <div className="min-height">
      <div className="cart-container">
        <div className="back-links">
          <a className="home-link" href="/">
            Home
          </a>{" "}
          /{" "}
          <a className="cart-link" href="/cart">
            Cart
          </a>
        </div>

        <div className="cart-table">
          <table className="cart-table">
            <thead>
              <tr className="cart-product-row">
                <th className="table-data first-element">Product</th>
                <th className="table-data price-column">Price</th>
                <th className="table-data quantity-column">Quantity</th>

                <th className="table-data last-element">Subtotal</th>
              </tr>
            </thead>
            {showCartItems()}
          </table>
        </div>
        <div className="cart-buttons">
          <a href="/">
            <button href="/" className="cart-btn">
              Return to Shop
            </button>
          </a>

          <button className="cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        <div className="flexed between mt">
          <div className="coupon flex">
            <input className="coupon-input" placeholder="  Coupon code"></input>
            <button className="coupon-btn">Apply Coupon</button>
          </div>

          <div className="cart-total-container">
            <h1>Cart Total</h1>
            <div className="flex underline total-item">
              <span>Subtotal:</span> <span>${calculateTotal()}</span>
            </div>
            <div className="flex underline total-item">
              <span>Shipping:</span> <span>Free</span>
            </div>
            <div className="flex underline total-item">
              <span>Total:</span>
              <span>${calculateTotal()}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      </div>

      <div className="cart-container-mobile">{ShowCartItemsMobile()}</div>
    </div>
  );
};

export default CartPage;
