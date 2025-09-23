import { useState, useEffect } from "react";
import { USER_LOGIN_FEATURE } from "../config/featureFlags";

function LoginPage() {
  /* const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); */
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("123");

  const [notification, setNotification] = useState(""); // Store notification text
  const [notificationType, setNotificationType] = useState(""); // Store notification type (success/error)

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.message?.toLowerCase().includes("success")) {
        console.error("Login failed:", data.message);
        alert(data.message);
      } else {
        console.log("Login success:", data.message);

        alert(data.message);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      console.error("Network or server error:", error);
    }
  }
  if (!USER_LOGIN_FEATURE) return null;
  return (
    <div>
      {/* Display notification popup */}
      {notification && (
        <div className={`popup ${notificationType}`}>
          <div className="popup-content">
            <img
              src={
                notificationType === "success" ? "checkmark.png" : "error.png"
              }
              alt="Notification Icon"
            />
            <p>{notification}</p>
          </div>
        </div>
      )}

      {/* Your existing layout here */}
      <section className=" mx-4 md:mx-8 md:my-12 mb-20 border border-gray-400 md:border-0 rounded p-4">
        <div className="max-w-[1170px] mx-auto">
          <div className="hidden md:block mb-10">
            <a className="text-gray-500" href="/">
              Home
            </a>{" "}
            / Login
          </div>

          <div className="flex justify-between items-center">
            {/* Left image (hidden on small screens) */}
            <div className="hidden md:block w-6/12">
              <img src="phone-side.png" alt="Phone illustration" />
            </div>

            {/* Login form */}
            <div className="w-full md:w-5/12 lg:w-4/12">
              <h1 className="text-2xl text-center md:text-left md:text-3xl mb-3 lg:mb-5">
                Log in to Lexus
              </h1>
              <h5 className="mb-3 lg:mb-5">Enter your details below</h5>

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="border-b w-full py-2 md:py-0 border-gray-400 mb-3 lg:mb-5 focus:outline-0"
                  placeholder="Email or Phone Number"
                  value={email}
                  onChange={handleChangeEmail}
                  required
                />
                <br />

                <input
                  type="password"
                  className="border-b w-full py-2 md:py-0 border-gray-400 mb-3 lg:mb-5 focus:outline-0"
                  placeholder="Password"
                  value={password}
                  onChange={handleChangePassword}
                  required
                />
                <br />

                <div className="flex items-center justify-between flex-row-reverse md:flex-row">
                  <button
                    type="submit"
                    className="pointer hover:opacity-50 hover-change w-4/12 py-2 text-white rounded bg-[#DB4444] md:mr-5"
                  >
                    Login
                  </button>
                  <p className="text-red-400  ">Forgot Password?</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
