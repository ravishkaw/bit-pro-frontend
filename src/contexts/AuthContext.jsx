import { createContext, useContext, useState, useEffect } from "react";
import { message } from "antd";
import { login, logout, session } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkSession = async () => {
    try {
      const response = await session();      
      setUser({
        username: response.username,
        role: response?.roles[0]?.name.toLowerCase(),
      });
    } catch (error) {
      console.error("Session check failed:", error);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const handleLogin = async (loginFormData) => {
    try {
      const response = await login(loginFormData);
      if (response) {
        setUser({
          username: response.username,
          role: response?.roles[0]?.name.toLowerCase(),
        });
        message.success("Login successful!");
        return true;
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.error(error.response?.data?.message || "Login failed");
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      message.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      message.error("Logout failed");
    }
  };


  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
