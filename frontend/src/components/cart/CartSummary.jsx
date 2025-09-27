import { useCart } from "../../context/ContextCart";

export function CartSummary() {
  const { calculateTotal } = useCart();
  return (
    <div className="mx-auto w-3/5 outline py-10 px-10 lg:mx-0 lg:w-2/5">
      <h1 className="font-bold">Cart Total</h1>
      <div className="flex underline-one justify-between py-3">
        <span>Subtotal:</span> <span>${calculateTotal()}</span>
      </div>
      <div className="flex underline-one justify-between py-3">
        <span>Shipping:</span> <span>Free</span>
      </div>
      <div className="flex underline-one justify-between py-3">
        <span className="font-bold">Total:</span>
        <span className="font-bold">${calculateTotal()}</span>
      </div>
      <a href="/checkout">
        <button className="mt-5 text-white bg-[#db4444] py-3 px-6 rounded lg:float-right flex mx-auto pointer hover:opacity-50 hover-change">
          Proceed to Checkout
        </button>
      </a>
    </div>
  );
}
