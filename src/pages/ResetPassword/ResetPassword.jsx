import React from "react";
import "./resetPassword.css";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="resetPwd-wrapper">
      <div className="resetPwd-container">
        <Link className="back-icon" to={"/"}>
          &#8592;
        </Link>

        <h1 className="resetPwd-title">Change Password</h1>

        <form>
          <div className="resetPwd-form-group">
            <label htmlFor="password">Old Password</label>
            <input type="password" id="password" name="password" required />
          </div>

          <div className="resetPwd-form-group">
            <label htmlFor="password">New Password</label>
            <input type="password" id="password" name="password" required />
          </div>

          <div className="resetPwd-form-group">
            <label htmlFor="confirm-password">Confirm New Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
            />
          </div>

          {/* <!-- Button Update --> */}
          <button type="submit" className="resetPwd-button">
            Update
          </button>

          {/* <div className="forgotPwd-link">
            <a href="forgot-password.html">Forgot password?</a>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
