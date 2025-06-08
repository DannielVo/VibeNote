import React, { useEffect, useState } from "react";
import "./resetPassword.css";
import { Link } from "react-router-dom";
import API from "../../hooks/api";

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cNewPassword, setCNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !cNewPassword) {
      alert("Fields cannot be empty!");
      return;
    }

    const dataRequest = {
      name: name,
      email: email,
      password: newPassword,
      password_confirmation: cNewPassword,
    };

    try {
      setLoading(true);
      const response = await API.put("/user/profile", dataRequest);
      setLoading(false);
      alert("Successfully updated password!");
    } catch (err) {
      setLoading(false);
      alert(
        "Something went wrong. Please check the data input and try again later!"
      );
      console.error(err);
    }
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          const response = await API.get("/user");
          setEmail(response.data.email);
          setName(response.data.name);
        } catch (error) {
          alert("Error fetching data:", error);
        }
      };

      fetchData();
    } catch (error) {}
  }, []);

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
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="resetPwd-form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="nPassword"
              name="password"
              required
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="resetPwd-form-group">
            <label htmlFor="confirm-password">Confirm New Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
              onChange={(e) => setCNewPassword(e.target.value)}
            />
          </div>

          {/* <!-- Button Update --> */}
          <button
            type="submit"
            className="resetPwd-button"
            onClick={handleUpdate}
          >
            {loading ? "Updating..." : "Update"}
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
