import { createContext, useContext, useState, useEffect } from "react";
import { message } from "antd";
import { login, logout, session } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // messages
  const [messageApi, contextHolder] = message.useMessage();

  // check session from the stored cookie and log in
  const checkSession = async () => {
    try {
      const response = await session();
      setUser({
        username: response.username,
        role: response?.roles[0]?.name.toLowerCase(),
      });
      messageApi.success("Session verified. Login successful!");
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
        messageApi.success("Login successful");
        return true;
      }
    } catch (error) {
      console.error("Login failed:", error);
      messageApi.error(error.response?.data?.message || "Login failed");
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      messageApi.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      messageApi.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {contextHolder}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
