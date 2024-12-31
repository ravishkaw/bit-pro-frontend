import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import {MobileProvider} from "./contexts/MobileContext.jsx"

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <MobileProvider>
      <App />
    </MobileProvider>
  </AuthProvider>
);
