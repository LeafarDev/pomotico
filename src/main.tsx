import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Header } from "./components/Header/Header.tsx";
import App from "./pages/App.tsx";
import "./index.css";
import { GlobalStyle } from "./pages/styles/globalStyle.ts";
import PWABadge from "./PWABadge.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PWABadge />
    <GlobalStyle />
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
