import { useCart } from "../context/ContextCart";

const MobileLinks = () => {
  const { getCartItemsCount } = useCart();

  return (
    <div className="hidden mobile-links">
      <ul>
        <li>
          <a href="/">
            <img className="mobile-hover home" src="home.png" alt="Home" />
          </a>
        </li>
        <li>
          <a href="/like">
            <img className="mobile-hover" src="user-icon.png" alt="User" />
          </a>
        </li>
        <li className="cart-item-mobile">
          <a className="" href="/cart">
            <img className="mobile-hover" src="cart-icon.png" alt="Cart" />
            {getCartItemsCount() !== 0 && (
              <span className="popup-item-number">
                <span>{getCartItemsCount()}</span>
              </span>
            )}
          </a>
        </li>
        <li>
          <a href="/options">
            <img className="mobile-hover" src="hamburger.png" alt="Menu" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MobileLinks;
