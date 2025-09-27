import { useCart } from "../../context/ContextCart";

export function CartItemsMobile() {
  const { cart, updateQuantity, removeFromCart } = useCart();

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
}
