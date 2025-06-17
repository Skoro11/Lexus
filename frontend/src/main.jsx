import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";

/* import AppTest from "./AppTest.jsx"; */

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <AppTest /> */}
  </StrictMode>
);
