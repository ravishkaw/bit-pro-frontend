import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

// Checks if the user has access to a specific module
const ModuleAccess = ({ module, children }) => {
  const navigate = useNavigate();
  const { privilegedModules } = useAuth(); // Get user's allowed modules

  // Redirect to unauthorized page if the user doesn't have access
  useEffect(() => {
    if (!privilegedModules?.includes(module)) {
      navigate("/unauthorized");
    }
  }, [privilegedModules, module, navigate]);

  // Render the children if access is granted
  return children;
};

export default ModuleAccess;
