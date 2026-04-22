import "./index.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { DollarSign } from "lucide-react";

const BASE_URL = "https://expensetracker-backend-lvzi.onrender.com";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginUser = async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log("Login response:", data);
      if (response.status === 400) {
        setError(data.message || "Bad Request");
      }
      if (!response.ok) {
        setError(data.message || "Something went wrong");
        return;
      }
      if (response.ok) {
        alert(data.message);

        Cookies.set("jwt_token", data.token, { expires: 1 });
        navigate("/");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setError(error.message);
      console.log("error", error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      email,
      password,
    };
    await loginUser(userData);
  };

  const handleGuestLogin = async () => {
    await loginUser({ email: "guest@gmail.com", password: "123456" });
  };

  return (
    <div className="login-page">
      <div className="login-page-header">
        <div className="logo-box">
          <DollarSign size={20} color="white" />
        </div>
        <h1>ExpenseFlow</h1>
        <p>Track your finances with clarity</p>
      </div>
      <div className="login-container ">
        <h2 className="login-title">Login</h2>
        <div className="login-demo-credentials">
          <p>
            <strong>Demo Credentials:</strong>
          </p>
          <p>Email: guest@gmail.com</p>
          <p>Password: 123456</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="login-form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button
            className="login-button"
            type="button"
            onClick={handleGuestLogin}
          >
            Login As Guest
          </button>
          <button className="login-button" type="submit">
            Login
          </button>
          <p className="error-msg">{error}</p>
        </form>

        <div className="login-footer">
          <p>Don't have an account?</p>
          <Link to="/register" className="navigator-link">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
