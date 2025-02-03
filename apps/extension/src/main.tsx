import "./reset.css";
import "./globals.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { LockScreen } from "./App";
import { Coupons } from "./Coupons";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Coupons />
  </React.StrictMode>
);
