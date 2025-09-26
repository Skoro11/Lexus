import { useCart } from "../../context/ContextCart";
import { VscChevronUp, VscChevronDown, VscClose } from "react-icons/vsc";

export function CartTable() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <tbody>
        <tr>
          <td className="text-xl py-3">Your cart is empty</td>
        </tr>
      </tbody>
    );
  }
  return (
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
          <td className="px-4 border-t border-b border-gray-400 ">
            ${item.price}
          </td>
          <td className="px-4 border-t border-b border-gray-400">
            <div className="flex items-center border w-fit rounded-xl">
              <span className="m-2 w-3">{item.quantity}</span>
              <span className="flex flex-col cursor-pointer">
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
            {(
              (typeof item.price === "string"
                ? parseFloat(item.price.replace("$", ""))
                : item.price) * item.quantity
            ).toFixed(2)}
          </td>
        </tr>
      ))}
    </tbody>
  );
}
