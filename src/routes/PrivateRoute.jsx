import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

// Protects routes by checking if the user is logged in
const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Get the current user from AuthContext
  const navigate = useNavigate();

  // Redirect to login page if the user is not logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Render the children only if the user is logged in
  return user ? children : null;
};

export default PrivateRoute;
