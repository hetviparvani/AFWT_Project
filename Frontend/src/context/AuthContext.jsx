import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const demoUsers = [
  { id: 1, name: "Admin User", email: "admin@salon.com", password: "admin123", role: "Admin" },
  { id: 2, name: "Marcus Vance", email: "marcus@salon.com", password: "barber123", role: "Barber" },
  { id: 3, name: "Sarah Chen", email: "sarah@salon.com", password: "barber123", role: "Barber" },
  { id: 4, name: "Emily Roberts", email: "emily@salon.com", password: "recep123", role: "Receptionist" },
  { id: 5, name: "Alex Mercer", email: "alex@example.com", password: "customer123", role: "Customer" },
  { id: 6, name: "Jessica Wilson", email: "jessica@example.com", password: "customer123", role: "Customer" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user) {
            setUser(data.user);
            setToken(savedToken);
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
            setToken("");
          }
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          setToken("");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  async function login(email, password) {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || "Invalid credentials");
    }
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }

  async function register(name, email, phone, password) {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password, role: "Customer" }),
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || "Registration failed");
    }
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, demoUsers }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
