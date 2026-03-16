import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const storedToken = localStorage.getItem("token");

  const decoded = storedToken ? jwtDecode(storedToken) : null;

  const [token, setToken] = useState(storedToken);
  const [role, setRole] = useState(decoded?.role);
  const [user, setUser] = useState(decoded);

  const login = (token) => {

    const decoded = jwtDecode(token);

    localStorage.setItem("token", token);

    setToken(token);
    setRole(decoded.role);
    setUser(decoded);
  };

  const logout = () => {

    localStorage.removeItem("token");

    setToken(null);
    setRole(null);
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        user,
        isAuthenticated: !!token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};