import React from "react";
import ReactDOM from "react-dom/client";
import Modal from "react-modal";
import { BrowserRouter, Routes, Route } from "react-router";
import { Header } from "./components/Header/Header.tsx";
import { HistoricalGraph } from "./components/HistoricalGraph/HistoricalGraph.tsx";
import ConfigProfileForm from "./components/ProfileConfiguration/ConfigProfileForm.tsx";
import App from "./pages/App.tsx";
import "./index.css";
import { GlobalStyle } from "./pages/styles/globalStyle.ts";
import PWABadge from "./serviceWorker/PWABadge.tsx";
import { ServiceWorkerProvider } from "./serviceWorker/ServiceWorkerContext.tsx";

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ServiceWorkerProvider>
      <PWABadge />
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
      <ConfigProfileForm />
      <HistoricalGraph />
    </ServiceWorkerProvider>
  </React.StrictMode>,
);
