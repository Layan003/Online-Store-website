import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CartSummary from "./pages/CartSummary";
import Layout from "./components/Layout";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/signup" element={<Layout><SignUp /></Layout>} />
        <Route path="/cart" element={<Layout><CartSummary /></Layout>} />
        <Route path="/checkout" element={<Layout><Checkout /></Layout>} />




      </Routes>
    </Router>
  );
}

export default App;
