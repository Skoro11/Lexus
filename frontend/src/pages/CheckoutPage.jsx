import { useCart } from "../context/ContextCart";
import { useState } from "react";
function CheckoutPage() {
  const validateForm = () => {
    // Check required inputs
    const { firstName, email, street, city, phone } = formData;
    if (!firstName || !email || !street || !city || !phone) {
      alert("Please fill in all required fields.");
      return false;
    }

    // Check payment method
    if (!selectedPayment) {
      alert("Please select a payment method.");
      return false;
    }

    return true; // all good
  };
  const { cart } = useCart();

  const cartSummary = cart.map((item) => ({
    id: item._id,
    name: item.name,
    quantity: item.quantity,
  }));

  const [selectedPayment, setSelectedPayment] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    street: "",
    apartment: "",
    city: "",
    phone: "",
  });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = () => {
    if (!validateForm()) return;
    const payload = {
      cart: cartSummary,
      paymentMethod: selectedPayment,
      billingDetails: formData,
    };

    console.log("Payment information", payload);
    alert("Order placed successfully");
  };
  const handleChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const { showCartItemsMinimal, calculateTotal } = useCart();
  return (
    <section className="mx-4 md:mx-8 md:my-12">
      <h1 className="text-xl md:text-4xl my-8 md:my-12 max-w-[1170px] mx-auto">
        Billing Details
      </h1>
      <div className="max-w-[1170px] mx-auto md:flex justify-between ">
        <form className=" mb-10 md:mb-0 md:w-1/3">
          <ul>
            <li className="text-gray-500">First name*</li>
            <li className="mb-4">
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChangeForm}
                className="bg-gray-100 p-2 w-full rounded"
              />
            </li>

            <li className="text-gray-500">Email Address*</li>
            <li className="mb-4">
              <input
                name="email"
                value={formData.email}
                onChange={handleChangeForm}
                className="bg-gray-100 p-2 w-full rounded"
              />
            </li>

            <li className="text-gray-500">Street Address*</li>
            <li className="mb-4">
              <input
                name="street"
                value={formData.street}
                onChange={handleChangeForm}
                className="bg-gray-100 p-2 w-full rounded"
              />
            </li>

            <li className="text-gray-500">Apartment, floor, etc. (optional)</li>
            <li className="mb-4">
              <input
                name="apartment"
                value={formData.apartment}
                onChange={handleChangeForm}
                className="bg-gray-100 p-2 w-full rounded"
              />
            </li>

            <li className="text-gray-500">Town/City*</li>
            <li className="mb-4">
              <input
                name="city"
                value={formData.city}
                onChange={handleChangeForm}
                className="bg-gray-100 p-2 w-full rounded"
              />
            </li>

            <li className="text-gray-500">Phone Number*</li>
            <li className="mb-4">
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChangeForm}
                className="bg-gray-100 p-2 w-full rounded"
              />
            </li>

            <li></li>
          </ul>
        </form>
        <div className="md:w-1/2 lg:w-1/3">
          <div className="mt-4">{showCartItemsMinimal()}</div>

          <div className="mx-auto  lg:mx-0">
            <div className="flex underline-one justify-between py-3">
              <span>Subtotal:</span> <span>${calculateTotal()}</span>
            </div>
            <div className="flex underline-one justify-between py-3">
              <span>Shipping:</span> <span>Free</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="">Total:</span>
              <span className="">${calculateTotal()}</span>
            </div>
            <ul>
              <li className="flex justify-between">
                <span>
                  <input
                    required
                    type="radio"
                    name="payment"
                    value="Bank"
                    checked={selectedPayment === "Bank"}
                    onChange={handleChange}
                    className="accent-blue-500"
                  />
                  <label> Bank</label>
                </span>
                <img src="bankIcons.png" className="w-1/2"></img>
              </li>
              <li>
                <input
                  type="radio"
                  name="payment"
                  value="Cash on delivery"
                  checked={selectedPayment === "Cash on delivery"}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                <label> Cash on delivery</label>
              </li>
            </ul>
          </div>
          <button
            onClick={submitForm}
            className="w-full md:w-auto bg-[#db4444] mt-4 py-3 px-10 text-white rounded-xl max-h-14 hover-change mb-20 md:mb-0"
          >
            Place Order
          </button>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;
