import { createContext, useContext, useState } from "react";

// Create Context
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    companyName: "",
  });

  // Function to update auth data
  const updateAuthData = (value) => {
    setAuthData(value);
  };

  const logout = () => {
    setAuthData({ email: "", password: "", companyName: "" });
    alert("You have been logged out successfully!!!");
  };

  return (
    <AuthContext.Provider value={{ authData, updateAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for using AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
