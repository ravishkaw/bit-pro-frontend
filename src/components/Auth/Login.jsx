import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const { setUser, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (role) => {
    setLoading(true);
    try {
      const response = await fakeLoginApi(role);
      setUser(response.user);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  // Redirect when user state changes
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "manager") {
        navigate("/manager");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  return (
    <div>
      <button onClick={() => handleLogin("admin")} disabled={loading}>
        {loading ? "Logging in..." : "Login as Admin"}
      </button>
      <button onClick={() => handleLogin("manager")} disabled={loading}>
        {loading ? "Logging in..." : "Login as Manager"}
      </button>
    </div>
  );
};

export default Login;

// Simulate async login API (replace with real DB/API call)
const fakeLoginApi = (role) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: { name: "John Doe", role } });
    }, 1500); // Simulate network delay
  });
};
