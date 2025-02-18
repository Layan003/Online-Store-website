import React from "react";
import "../styles/Form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../Context/AuthContext";
import Loading from "./Loading";

export default function Form({ method }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [errorMessage, setErrorMessage] = useState(""); //for login
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (method == "login") {
      try {
        const res = await api.post("token/", { username, password });
        if (res.status == 200) {
          localStorage.setItem("access", res.data.access);
          localStorage.setItem("refresh", res.data.refresh);
          setIsAuthenticated(true);
          navigate("/");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.error);
          console.log(error.response.data);
        }
        setErrorMessage('No active account found with the given credentials');
      } finally {
        setLoading(false);
      }
    } else {
      const first_name = firstName;
      try {
        const res = await api.post("signup/", {
          email,
          first_name,
          username,
          password,
        });

        if (res.status == 201) {
          localStorage.setItem("access", res.data.access);
          localStorage.setItem("refresh", res.data.refresh);
          setIsAuthenticated(true);
          navigate("/");
        }
      } catch (error) {
        setErrorMessage('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  };
  if (loading == true) {
    return <Loading />;
  }
  const allErrors = Object.values(errorMessages).flat();
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
              {method == "signup" && (
                <input
                  type="text"
                  className="email-input bg-white"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Name: "
                  required
                />
              )}

              <input
                type="text"
                className="email-input bg-white"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username: "
                required
              />
              {method == "signup" && (
                <input
                  type="email"
                  className="email-input bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email: "
                  required
                />
              )}

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
              {errorMessage && (
                <div className="warning-message">
                  <p>{errorMessage}</p>
                </div>
              )}
            </div>

            <h2>Forget password?</h2>

            <button
              type="submit"
              className="form-button"
              onClick={handleSubmit}
            >
              {method === "login" ? "login" : "signup"}
            </button>
            {error && <p className="text-red-500 ">{error}</p>}
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
