import React from "react";
import "./forgotPassword.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="password-wrapper">
      <div className="password-container">
        <h1 className="password-title">Reset Password</h1>

        <form>
          <div className="forgot-pwd-form-group">
            <label htmlFor="email">Enter your email address</label>
            <input type="email" id="email" name="email" required />
          </div>

          <button type="submit" className="reset-button">
            Send Reset Link
          </button>

          <div className="back-to-login">
            <Link to={"/login"}>← Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
