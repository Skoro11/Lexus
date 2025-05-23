import  { useState, useEffect } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [notification, setNotification] = useState(""); // Store notification text
  const [notificationType, setNotificationType] = useState(""); // Store notification type (success/error)
  
  const hardcodedEmail = import.meta.env.VITE_USER_USERNAME;
  const hardcodedPassword = import.meta.env.VITE_USER_PASSWORD;
  
  useEffect(() => {
    // Check if the user is already logged in
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      // If already logged in, show notification
      setNotificationType("success");
      // Redirect to home page
      window.location.replace("/");
    }
  }, []);
  
  const handleLogin = () => {
    // Clear previous notification before checking credentials
    setNotification("");
    setNotificationType("");
  
    if (email === hardcodedEmail && password === hardcodedPassword) {
      // Successful login, set notification in sessionStorage
      localStorage.setItem("loggedIn", "true");
      sessionStorage.setItem("notification", "Login successful!");
      sessionStorage.setItem("notificationType", "success");
  
      // Redirect after a short delay to show the popup
      setTimeout(() => {
        window.location.replace("/"); // Redirect to main page
      }, 500); // Delay redirect for 2 seconds to let the popup show
    } else {
      // Check if the email matches but password is wrong
      if (email === hardcodedEmail && password !== hardcodedPassword) {
        setNotification("Incorrect password. Please try again.");
        setNotificationType("warning");
      } else {
        // Invalid credentials (wrong email or both wrong email & password)
        setNotification("Invalid credentials. User not found.");
        setNotificationType("error");
      }
  
      // Clear input fields and reset notification after 3 seconds
      setTimeout(() => {
        setEmail("");
        setPassword("");
        setNotification("");
        setNotificationType("");
      }, 5000);
  
      // Refresh the page after 6 seconds
      setTimeout(() => {
        window.location.reload(); // Refresh the page after 6 seconds
      }, 5000);
    }
  };


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
      <section className="mx-width-1170px mg-inline contact-page pd-in-30p pd-in-15-mb mg-bottom-5">
        <div className="links-home display-none-sm">
          <a className="home-link" href="/">Home</a> / Login
        </div>

        <div className="flex space-between align-center">
          <div className="width-50 display-none-sm">
            <img className="width-100" src="phone-side.png" alt="Phone" />
          </div>
          <div className="padding-left-5 min-width-30 signup-box">
            <h1 className="font-32px mg-bottom-5">Log in to Lexus</h1>
            <h5 className="mg-bottom-5">Enter your details below</h5>

            <input
              type="email"
              className="input-signup mg-bottom-5"
              placeholder="Email or Phone Number"
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

            <div className="flex align-center">
              <button className="width-30 mg-right-5" onClick={handleLogin}>Login</button>
              {/* <p className="padding-right-5 opacity-07"><a href="/signup">Register?</a></p> */}
              <p className="color-red">Forgot Password? </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
