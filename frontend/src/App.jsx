import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CartSummary from "./pages/CartSummary";
import Layout from "./components/Layout";
import Checkout from "./pages/Checkout";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import Dashboard from "./pages/Dashboard";

function Logout() {
  const {setIsAuthenticated} =useAuth();
  setIsAuthenticated(false);
  localStorage.clear()
  
  return <Navigate to="/" />;
}

function LogoutAndSignUp() {
  localStorage.clear()
  return <SignUp/>
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/signup" element={<Layout><LogoutAndSignUp /></Layout>} />
        <Route path="/cart" element={<Layout><CartSummary /></Layout>} />
        <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
        <Route path="/logout" element={<Layout><Logout /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />




      </Routes>
    </Router>
  );
}

export default App;
