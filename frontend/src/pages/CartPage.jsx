import { useCart } from "../context/ContextCart"; // Adjust the import path accordingly
const CartPage = () => {
  const { showCartItems, calculateTotal, clearCart, ShowCartItemsMobile } =
    useCart();

  return (
    <section className="my-12 mx-8">
        <div className="hidden md:block min-height max-w-[1170px] mx-auto ">
        <div className="mb-12">
          <a className="text-gray-500" href="/">
            Home
          </a>{" "}
          /{" "}
          <a href="/cart">
            Cart
          </a>
        </div>

        <div className="overflow-hidden rounded-xl ">
  <table className=" w-full border-separate border-spacing-y-4">
    <thead>
      <tr>
        <th className="border-l border-t border-b rounded-l-xl border-black py-5 px-4 text-left">Product</th>
        <th className="border-b border-t border-black py-5 px-4 text-left">Price</th>
        <th className="border-b border-t border-black py-5 px-4 text-left">Quantity</th>
        <th className="border-r border-b border-t rounded-r-xl border-black py-5 px-4 text-left">Subtotal</th>
      </tr>
    </thead>
    {showCartItems()}
  </table>
</div>
        <div className="flex justify-between">
          <a href="/">
            <button href="/" className="outline outline-gray-00 rounded py-4 px-8 font-bold pointer hover-change hover:bg-[#db4444] hover:text-white hover:outline-0">
              Return to Shop
            </button>
          </a>

          <button className="outline outline-gray-700 rounded py-4 px-16 font-bold pointer hover-change hover:bg-[#db4444] hover:text-white hover:outline-0" onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        <div className="flex justify-between  mt-10 lg:mt-30">
          <div className="hidden lg:flex w-2/5">
            <input className="px-5 outline outline-gray-700 max-h-14 rounded-xl " placeholder="Coupon code"></input>
            <button className=" text-white bg-[#db4444] rounded-xl max-h-14 ml-5 px-10 pointer hover:opacity-50 hover-change">Apply Coupon</button>
          </div>

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
            <button className="mt-5 text-white bg-[#db4444] py-3 px-6 rounded lg:float-right flex mx-auto pointer hover:opacity-50 hover-change">Proceed to Checkout</button>
          </div>
        </div>
      </div>

      <div className="md:hidden">{ShowCartItemsMobile()}</div>
    
    </section>
    
  );
};

export default CartPage;
