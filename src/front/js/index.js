import React from "react";  // Import react into the bundle
import ReactDOM from "react-dom";
import "../styles/index.css";  // Include your index.scss file into the bundle
import Layout from "./Layout.jsx";  // Import your own components


ReactDOM.render(<Layout />, document.querySelector("#app"));  // Render your react application
