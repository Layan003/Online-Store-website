import React, { use } from "react";
import "../styles/Form.css";
import { useState } from "react";
// import api from '../../api';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { useAuth } from "../../AuthContext";
import Navbar from "./Navbar";

export default function Form({ method }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //   const { setToken, setRefresh } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (method == 'login') {
    //     try {
    //         const res = await api.post('token/', {username, password});
    //         setToken(res.data.access);
    //         setRefresh(res.data.refresh);
    //         navigate('/');
    //     }
    //     catch (error) {
    //         console.error(error);
    //     }
    // }
    // else {
    //     try {
    //       const res = await api.post("signup/", {
    //         email,
    //         username,
    //         password,
    //       });

    //       if (res.status == 201) {
    //         setToken(res.data.access);
    //         setRefresh(res.data.refresh);
    //         navigate("/");
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     }
    // }
  };

  return (
    <>
      <div className="body mt-15">
        <div className="form-body">
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-intro">
              <h1 className="form-title">
                {method === "login" ? "Welcome Back!" : "Create Your Account"}
              </h1>
              <p>Please enter details below</p>
            </div>
            <div className="inputs-container">
              <input
                type="email"
                className="email-input bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email: "
                required
              />

              <input
                type="password"
                placeholder="Password: "
                value={password}
                className="bg-white"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* display error messages for sign up */}
              {/* {allErrors.length > 0 && (
              <div className="warning-message">
                {allErrors.map((message, index) => (
                  <p key={index}>{message}</p>
                ))}
              </div>
            )} */}

              {/* display error messages for login */}
              {/* {errorMessage && (
              <div className="warning-message">
                <p>{errorMessage}</p>
              </div> 
            )}  */}
            </div>

            <h2>Forget password?</h2>

            <button type="submit" className="form-button">
              {method === "login" ? "login" : "signup"}
            </button>
            {method === "login" ? (
              <p>
                Don't have an account?{" "}
                <Link to="/signup">
                  <span className="underline link">Sign Up</span>
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <Link to="/login">
                  <span className="underline link">Login</span>
                </Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
