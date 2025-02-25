import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useLayoutEffect,
} from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  const [itemsCount, setItemsCount] = useState(0);

  const fetchItemsCount = async () => {
    try {
      const res = await api.get("cart/");
      console.log(res.data);
      setItemsCount(res.data.items_count);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchIsAdmin = async () => {
    try {
      const res = await api.get('is-admin/')
      console.log(res.data);
      setIsAdmin(res.data.is_admin)
    }
    catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    if (isAuthenticated) {
      fetchIsAdmin();
      fetchItemsCount();
      
    } else {
      setItemsCount(0);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    auth().catch(() => {
      setIsAuthenticated(false);
      localStorage.clear();
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchItemsCount();
    } else {
      setItemsCount(0);
    }
  }, [isAuthenticated]);

  const auth = async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    const decoded = jwtDecode(token);
    const tokenExp = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExp < now) {
      await refreshToken();
    } else {
      setIsAuthenticated(true);
    }
  };

  const refreshToken = async () => {
    try {
      const res = await api.post("token/refresh/", {
        refresh: localStorage.getItem("refresh"),
      });

      if (res.status === 200) {
        localStorage.setItem("access", res.data.access);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        localStorage.clear()
      }
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      localStorage.clear()

    }
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, itemsCount, setItemsCount, setIsAdmin, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
