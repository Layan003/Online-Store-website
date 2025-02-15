import React, { Children } from "react";
import { useState, useContext, createContext, useEffect } from "react";
import api from "./api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [refresh, setRefresh] = useState(null);

  useEffect(() => {
    auth().catch(() => setToken(null));
  }, []);

  const auth = async () => {
    if (!token) {
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExp = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExp < now) {
      await refreshToken();
    } else {
      setToken(null);
    }
  };

  const refreshToken = async () => {
    try {
      const res = await api.post("token/refresh/", {
        refresh: refresh,
      });
      if (res.status === 200) {
        setToken(res.data.access);
      } else {
        setToken(null);
      }
    } catch (error) {
      console.log(error);
      setIsGuest(true);
    }
  };
  if (!token === null) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ setToken, token, setRefresh, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
