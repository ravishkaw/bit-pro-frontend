import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

// Check if a user logged in
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
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
