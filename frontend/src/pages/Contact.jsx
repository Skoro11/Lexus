import { useState } from "react";

import axios from "axios";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [failMessageVisible, setFailMessageVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_BASE_URL + "/api/auth/resend",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setFormData({ name: "", email: "", phone: "", message: "" });
        setSuccessMessageVisible(true);
        setTimeout(() => setSuccessMessageVisible(false), 6000);
      } else {
        alert("Failed to send message.");
        setFailMessageVisible(true);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setFailMessageVisible(true);
    }
  };

  return (
    <section className=" mx-4 md:mx-8 md:my-12 ">
      <div className="max-w-[1170px] mx-auto">
        <div className="hidden mb-10 md:flex">
          <a className="hidden md:block text-gray-500" href="/">
            Home
          </a>{" "}
          / Sign Up
        </div>

        <div className="md:justify-between md:flex md:gap ">
          <div className="hidden lg:block w-4/12  p-8 border rounded-2xl shadow-2xl border-gray-400">
            <ul className="flex flex-col">
              <li className="flex items-center font-bold pb-2">
                <img src="call-us-icon.png" alt="Call us" />
                <span className="pl-4">Call us</span>
              </li>
              <li className="pb-2">We are available 24/7, 7 days a week.</li>
              <li className="pb-2">Phone: +8801611112222</li>
              <li className="pb-2">
                <hr />
              </li>
              <li className="flex items-center font-bold pb-2">
                <img src="write-to-us-icon.png" alt="Write to us" />
                <span className="pl-4">Write to us</span>
              </li>
              <li className="pb-2">
                Fill out our form and we will contact you within 24 hours.
              </li>
              <li className="pb-2">Emails: customer@exclusive.com</li>
              <li className="pb-2">Emails: support@exclusive.com</li>
            </ul>
          </div>

          <div className="w-full md:max-w-160 mx-auto lg:mx-0 lg:w-7/12 px-4 py-8 md:p-8 border border-gray-400 rounded-2xl">
            <form onSubmit={handleSubmit}>
              <div className="flex-col md:gap-4 flex md:flex-row ">
                <div className="md:hidden text-center text-xl mb-4">
                  Send us a message
                </div>
                <input
                  type="text"
                  className="md:w-1/3 md:pl-3 py-1 border-b-1 md:border md:rounded mb-4 md:mb-0 md:bg-gray-100 border-gray-400"
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  className="md:w-1/3 md:pl-3 py-1 border-b-1 md:border md:rounded mb-4 md:mb-0 md:bg-gray-100 border-gray-400"
                  placeholder="Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  className="md:w-1/3 md:pl-3 py-1 border-b-1 md:border md:rounded mb-0 md:bg-gray-100 border-gray-400"
                  placeholder="Your Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-6">
                <textarea
                  className="w-full pl-3 pt-3 min-h-40 border rounded md:bg-gray-100 border-gray-400"
                  placeholder="Your Message goes here..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                className="w-full md:w-1/4 md:float-right outline py-2 px-4 rounded-3xl md:rounded bg-[#db4444] text-white hover:opacity-50 hover-change pointer"
                type="submit"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {successMessageVisible && (
          <div className="popup">
            <div className="popup-content">
              <img src="checkmark.png" alt="Error" />
              Message sent successfully!
            </div>
          </div>
        )}
        {failMessageVisible && (
          <div className="popup">
            <div className="popup-content">
              <img src="error.png" alt="Error" />
              Error occurred while sending a message!
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ContactPage;
