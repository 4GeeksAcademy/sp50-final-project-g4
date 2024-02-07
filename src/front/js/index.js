import React from "react";  // Import react into the bundle
import ReactDOM from "react-dom";
import "../styles/index.css";  // Include your index.scss file into the bundle
import Layout from "./Layout.jsx";  // Import your own components
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';


library.add(fas);


ReactDOM.render(<Layout />, document.querySelector("#app"));  // Render your react application
