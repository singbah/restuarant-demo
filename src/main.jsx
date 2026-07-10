import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "./index.css";
import AdminProvider from "./components/admins/adminContext.jsx";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <AdminProvider>
        <App />
      </AdminProvider>
    </BrowserRouter>
  </HelmetProvider>,
);
