import React from "react";
import "./signUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="signUp-wrapper">
      <div className="signUp-container">
        <h1 className="signUp-title">Sign Up</h1>

        <form>
          <div className="signUp-form-group">
            <label htmlFor="fullname">Fullname</label>
            <input type="text" id="fullname" name="fullname" required />
          </div>

          <div className="signUp-form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="signUp-form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>

          <div className="signUp-form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
            />
          </div>

          {/* <!-- Button Sign up --> */}
          <button type="submit" className="signUp-button">
            Sign Up
          </button>

          <div className="login-link">
            <p>
              Already have an account?{" "}
              <a onClick={() => navigate("/login")}>Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
