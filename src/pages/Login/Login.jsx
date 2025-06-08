import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import API from "../../hooks/api";
import { useNote } from "../../context/NoteContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useNote();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.post("/login", form);

      login(res);

      setLoading(false);
      // alert("Đăng nhập thành công!");
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Sai email hoặc mật khẩu!");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1 className="login-title">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
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
              {loading ? "Login..." : "Login"}
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
