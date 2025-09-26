import { useCart } from "../../context/ContextCart";
export function CartItemsPreview() {
  const { cart } = useCart();
  if (cart.length === 0) {
    return <div className="mx-4">Your cart is empty</div>;
  }
  return (
    <div className="">
      {cart.map((item) => (
        <div className="" key={item._id}>
          <div className="flex items-center mb-2 ">
            <img
              className=" w-1/5 object-contain pr-5"
              src={item.image}
              alt={item.name}
            />
            <div>
              {item.quantity}x {item.name}
            </div>
            <div className="ml-auto">${item.price * item.quantity}</div>
          </div>

          <div></div>
        </div>
      ))}
    </div>
  );
}
