
import { useState } from "react";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSignup = async (event) => {
    event.preventDefault()
    try {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    });

    // Check if response is OK (status 200-299)
    if (response.ok) {
      alert("User created")
    }
  } catch (error) {
    console.error("Error during signup:", error);
  }
  };

  function nameChange(event){
    setName(event.target.value)
    console.log(event.target.value)
  }

  function emailChange(event){
    setEmail(event.target.value)
  }

  function passwordChange(event){
    setPassword(event.target.value)
  }

  return (
    <section className="mx-width-1170px mg-inline contact-page pd-in-30p pd-in-15-mb mg-bottom-5">
      <div className="links-home display-none-sm">
        <a className="home-link" href="/">Home</a> / Sign Up
      </div>

      <div className="flex space-between align-center">
        <div className="width-50 display-none-sm">
          <img className="width-100" src="phone-side.png" alt="Phone" />
        </div>
        <div className="padding-left-5 min-width-30 signup-box">

          <h1 className="font-32px mg-bottom-5">Create an account</h1>
          <h5 className="mg-bottom-5">Enter your details below</h5>
    <form><input
            className="input-signup mg-bottom-5"
            placeholder="Name"
            value={name}
            onChange={nameChange}
          />
          <br />

          <input
            type="email"
            className="input-signup mg-bottom-5"
            placeholder="Email"
            value={email}
            onChange={emailChange}
          />
          <br />

          <input
            type="password"
            className="input-signup mg-bottom-5"
            placeholder="Password"
            value={password}
            onChange={passwordChange}
          />
          <br />

          <button className="width-100 mg-bottom-5" onClick={handleSignup}>
            Create Account
          </button>
          </form>
          
          <br />
          <button className="signup-btn width-100">
            <img className="padding-right-5" src="Icon-Google.png" alt="Google" />
            Sign up with Google
          </button>
          <br />
          <div className="flex">
            <p className="padding-right-5">Already have an account? </p>
            <a href="/login" className="underlined"> Log in</a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default SignupPage;
