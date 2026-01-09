import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // LOGIN
  // src/context/AuthContext.jsx
  const login = (userData, token) => {
    // Save token
    localStorage.setItem("token", token);

    // Create frontend user object
    const frontendUser = {
      name: userData.name,
      email: userData.email,
      role: userData.role || "customer",
    };

    localStorage.setItem("user", JSON.stringify(frontendUser));
    setUser(frontendUser);

    // Redirect based on role
    if (frontendUser.role === "admin") navigate("/admin");
    else navigate("/shop");
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };
  // Register (optional: auto-login after register)
  const register = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
