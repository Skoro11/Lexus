import { useCart } from "../../context/ContextCart";
export function ClearCartButton() {
  const { clearCart } = useCart();
  return (
    <button
      data-cy="clear-cart"
      className="outline outline-gray-700 rounded py-4 px-16 font-bold pointer hover-change hover:bg-[#db4444] hover:text-white hover:outline-0"
      onClick={clearCart}
    >
      Clear Cart
    </button>
  );
}
