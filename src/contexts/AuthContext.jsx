import { createContext, useContext, useState } from "react";

//Authentication context of the app. User authentication controls from here
const AuthContext = createContext();

// Check whethre user is stored in local storage
const localUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localUser);

  // Login and logout 
  const login = (userData) => setUser(userData);
  const logout = () => setTimeout(() => setUser(null), 1000);

  localStorage.setItem("user", JSON.stringify(user));

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
