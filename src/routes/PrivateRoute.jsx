import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

// Check if user is logged other wise redirect to login
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return user ? children : null;
};

export default PrivateRoute;
