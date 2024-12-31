import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const localUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localUser);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  localStorage.setItem("user", JSON.stringify(user));

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
