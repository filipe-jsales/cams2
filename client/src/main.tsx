import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { store } from "./store/store";

import "./index.css";
import { setStore } from "./utils/axiosConfig.ts";

setStore(store);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
