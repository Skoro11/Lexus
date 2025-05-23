
import { useState } from "react";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignup = async () => {
    const response = await fetch("http://localhost:8080/auth/signup", {  // Ensure your backend is listening at this endpoint
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  // Sending name, email, and password
        email: email,         // Changed username to email to match backend
        password: password,   // Sending password
        name: name            // Sending the name as well
      }),
    });

    const message = await response.text();
    alert(message); // Show the server response

    if (response.ok) {
      window.location.href = "/login"; // Redirect to login page after successful signup
    }
  };

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

          <input
            className="input-signup mg-bottom-5"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />

          <input
            type="email"
            className="input-signup mg-bottom-5"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <input
            type="password"
            className="input-signup mg-bottom-5"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <button className="width-100 mg-bottom-5" onClick={handleSignup}>
            Create Account
          </button>
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
