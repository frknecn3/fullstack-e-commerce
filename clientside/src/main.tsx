import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.jsx";
import { SearchProvider } from "./context/search.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <SearchProvider>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </SearchProvider>
  </AuthProvider>
);
