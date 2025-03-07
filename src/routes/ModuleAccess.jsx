import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

// Checks if the user has privileges to a specific module
const ModuleAccess = ({ module, children }) => {
  const navigate = useNavigate();
  const { privilegedModules } = useAuth();

  // Redirect to unauthorized page if the user doesn't have access
  useEffect(() => {
    if (!privilegedModules?.includes(module)) {
      navigate("/unauthorized");
    }
  }, [privilegedModules, module, navigate]);

  // return the children if access is granted
  return children;
};

export default ModuleAccess;
