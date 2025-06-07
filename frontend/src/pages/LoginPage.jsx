import  { useState, useEffect } from "react";

function LoginPage() {
  /* const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); */
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


   const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("123");

    
  const [notification, setNotification] = useState(""); // Store notification text
  const [notificationType, setNotificationType] = useState(""); // Store notification type (success/error)
  
  function handleChangeEmail(event){
    setEmail(event.target.value)
  }
 
  function handleChangePassword(event){
    setPassword(event.target.value)
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
      alert(data.message)
    } else {
      console.log("Login success:", data.message);
      
      alert(data.message)
      setTimeout(()=>{
      window.location.href="/"
      },1000)
    }
  } catch (error) {
    console.error("Network or server error:", error);
  }
}




  return (
    <div>
        {/* Display notification popup */}
        {notification && (
      <div className={`popup ${notificationType}`}>
        <div className="popup-content">
          <img 
            src={notificationType === "success" ? "checkmark.png" : "error.png"} 
            alt="Notification Icon" 
          />
          <p>{notification}</p>
        </div>
      </div>
    )}
      
    
      {/* Your existing layout here */}
      <section className="contact-page mx-width-1170px mg-inline pd-in-30p pd-in-15-mb mg-bottom-5">
  <div className="links-home display-none-sm">
    <a className="home-link" href="/">Home</a> / Login
  </div>

  <div className="flex space-between align-center">
    {/* Left image (hidden on small screens) */}
    <div className="width-50 display-none-sm">
      <img className="width-100" src="phone-side.png" alt="Phone illustration" />
    </div>

    {/* Login form */}
    <div className="padding-left-5 min-width-30 signup-box">
      <h1 className="font-32px mg-bottom-5">Log in to Lexus</h1>
      <h5 className="mg-bottom-5">Enter your details below</h5>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="input-signup mg-bottom-5"
          placeholder="Email or Phone Number"
          value={email}
          onChange={handleChangeEmail}
          required
        />
        <br />

        <input
          type="password"
          className="input-signup mg-bottom-5"
          placeholder="Password"
          value={password}
          onChange={handleChangePassword}
          required
        />
        <br />

        <div className="flex align-center">
          <button type="submit" className="width-30 mg-right-5">
            Login
          </button>
          <p className="color-red">Forgot Password?</p>
        </div>
      </form>
    </div>
  </div>
</section>

    </div>
  );
}

export default LoginPage;
