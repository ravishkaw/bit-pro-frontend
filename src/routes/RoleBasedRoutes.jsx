import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

// Check the user roles 
const RoleBasedRoutes = ({ role, children }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role !== role) {
      navigate("/unauthorized");
    }
  }, [user, role, navigate]);

  return user?.role === role ? children : null;
};

export default RoleBasedRoutes;
