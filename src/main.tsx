import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/assets/styles/global.css";
import { MenuProvider } from "@/context/menu/MenuContext";
import "@fortawesome/fontawesome-free/css/all.min.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MenuProvider>
      <App />
    </MenuProvider>
  </React.StrictMode>
);