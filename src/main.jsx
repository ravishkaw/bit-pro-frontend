import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { MobileProvider } from "./contexts/MobileContext.jsx";
import { HeaderTitleProvider } from "./contexts/HeaderTitleContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <MobileProvider>
      <HeaderTitleProvider>
        <App />
      </HeaderTitleProvider>
    </MobileProvider>
  </AuthProvider>
);
