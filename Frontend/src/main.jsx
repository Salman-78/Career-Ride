import { createRoot } from "react-dom/client";
import Body from "./components/Custom/Body.jsx";
import "./index.css";
import AppProvider from "./provider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <AppProvider>
    <Body />
    <ToastContainer />
  </AppProvider>
);
