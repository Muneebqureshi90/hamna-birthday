import React from "react";
import { createRoot } from "react-dom/client";
import HamnaBirthday from "./HamnaBirthday.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HamnaBirthday />
  </React.StrictMode>
);
