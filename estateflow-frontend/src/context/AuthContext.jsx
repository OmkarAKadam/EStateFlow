import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const storedToken = localStorage.getItem("token");

  const [token, setToken] = useState(storedToken);
  const [role, setRole] = useState(
    storedToken ? jwtDecode(storedToken).role : null
  );

  const login = (token) => {

    const decoded = jwtDecode(token);

    localStorage.setItem("token", token);

    setToken(token);
    setRole(decoded.role);
  };

  const logout = () => {

    localStorage.removeItem("token");

    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        isAuthenticated: !!token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};