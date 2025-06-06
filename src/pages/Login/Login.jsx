import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1 className="login-title">Login</h1>

        <form>
          <div className="login-form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="login-form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>

          <div className="login-form-footer">
            <button
              onClick={() => navigate("/forgot-password")}
              type="button"
              className="forgot-password"
            >
              Forgot password
            </button>
            <button type="submit" className="login-button">
              Login
            </button>
          </div>

          <div className="register-link">
            Don't have an account?{" "}
            <a onClick={() => navigate("/signup")}>Register now!</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
