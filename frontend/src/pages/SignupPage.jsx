import { useState } from "react";
import { USER_LOGIN_FEATURE } from "../config/featureFlags";
function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      // Check if response is OK (status 200-299)
      if (response.ok) {
        alert("User created");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  function nameChange(event) {
    setName(event.target.value);
    console.log(event.target.value);
  }

  function emailChange(event) {
    setEmail(event.target.value);
  }

  function passwordChange(event) {
    setPassword(event.target.value);
  }
  if (!USER_LOGIN_FEATURE) return null;
  return (
    <section className="mx-4 md:mx-8 md:my-12 border border-gray-400 md:border-0 rounded p-4  ">
      <div className="max-w-[1170px] mx-auto">
        <div className=" hidden md:flex mb-10 ">
          <a className=" text-gray-500" href="/">
            Home
          </a>{" "}
          / Sign Up
        </div>

        <div className="flex justify-between items-center">
          <div className="hidden md:block w-6/12 ">
            <img src="phone-side.png" alt="Phone" />
          </div>
          <div className=" w-full md:w-5/12 lg:w-4/12">
            <h1 className="text-2xl md:text-3xl text-center md:text-left mb-3 lg:mb-5 ">
              Create an account
            </h1>
            <h5 className="mb-3 lg:mb-5">Enter your details below</h5>
            <form>
              <input
                className="border-b w-full py-2 md:py-0 border-gray-400 mb-3 lg:mb-5 focus:outline-0"
                placeholder="Name"
                value={name}
                onChange={nameChange}
              />
              <br />

              <input
                type="email"
                className="border-b w-full py-2 md:py-0 border-gray-400 mb-3 lg:mb-5 focus:outline-0"
                placeholder="Email"
                value={email}
                onChange={emailChange}
              />
              <br />

              <input
                type="password"
                className="border-b w-full py-2 md:py-0 border-gray-400 mb-3 lg:mb-5 focus:outline-0"
                placeholder="Password"
                value={password}
                onChange={passwordChange}
              />
              <br />

              <button
                className="w-full  bg-[#DB4444] text-white py-3 rounded mb-3 lg:mb-5 hover:opacity-50 pointer"
                onClick={handleSignup}
              >
                Create Account
              </button>
            </form>

            <button className="flex border justify-center py-3 rounded w-full hover:opacity-50 pointer">
              <img className="pr-3" src="Icon-Google.png" alt="Google" />
              Sign up with Google
            </button>
            <br />
            <div className="flex">
              <p className="pr-3">Already have an account? </p>
              <a href="/login" className="underline">
                {" "}
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupPage;
