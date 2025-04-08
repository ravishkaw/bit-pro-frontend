import { createContext, useContext, useState, useEffect } from "react";
import { message } from "antd";
import { login, logout, session } from "../services/auth";

// Context to manage auth stuff
const AuthContext = createContext();

// to handle user auth, session, and permissions
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Logged-in user
  const [privilegedModules, setPrivilegedModules] = useState([]); // Modules user can access
  const [privileges, setPrivileges] = useState([]); // User's modules and their permissions
  const [loading, setLoading] = useState(true); // loading state

  // For showing messages
  const [messageApi, contextHolder] = message.useMessage();

  // Check the use session exists
  const checkSession = async () => {
    try {
      setLoading(true);
      const response = await session();
      setUser({ userId: response.userId, role: response?.roles });
      setPrivilegedModules(response.privilegedModules);
      setPrivileges(response.privileges);
      // messageApi.success("Session verified. Login successful!");
    } catch (error) {
      messageApi.warning("Please Login!");
      console.error("Session check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check session when component loads
  useEffect(() => {
    checkSession();
  }, []);

  // Handle login
  const handleLogin = async (loginFormData) => {
    try {
      const response = await login(loginFormData);
      if (response) {
        setUser({ userId: response.userId, role: response?.roles });
        setPrivilegedModules(response.privilegedModules);
        setPrivileges(response.privileges);
        messageApi.success("Login successful");
      }
    } catch (error) {
      console.error("Login failed:", error);
      messageApi.error(error.response?.data?.message || "Login failed");
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setPrivilegedModules(null);
      setPrivileges(null);
      messageApi.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      messageApi.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        privileges,
        privilegedModules,
        handleLogin,
        handleLogout,
      }}
    >
      {contextHolder} {/* Needed for messages to work */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
