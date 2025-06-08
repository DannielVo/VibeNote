import React, { useState } from "react";
import "./signUp.css";
import { useNavigate } from "react-router-dom";
import API from "../../hooks/api";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.post("/register", form);
      alert("Đăng ký thành công!");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.error(error.response.data);
      alert("Đăng ký thất bại!");
    }
  };

  return (
    <div className="signUp-wrapper">
      <div className="signUp-container">
        <h1 className="signUp-title">Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <div className="signUp-form-group">
            <label htmlFor="fullname">Fullname</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="signUp-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="signUp-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="signUp-form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
              onChange={(e) =>
                setForm({ ...form, password_confirmation: e.target.value })
              }
            />
          </div>

          {/* <!-- Button Sign up --> */}
          <button type="submit" className="signUp-button">
            {loading ? "Registering..." : "Sign Up"}
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
