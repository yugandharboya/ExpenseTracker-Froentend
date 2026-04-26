import "./index.css";
import { BASE_URL } from "../../constants/constants";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AuthHeader from "../../components/authHeader";

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

      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        setError(data.message || "something went wrong");
        return;
      }

      if (data.token) {
        Cookies.set("jwt_token", data.token, { expires: 1 });
      }

      navigate("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError("network error. Try again");
      console.log(error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Email and Password are required");
      return;
    }
    if (!email.includes("@")) {
      setError("Enter valid email");
      return;
    }

    setError("");
    const userData = {
      email: email.trim(),
      password: password.trim(),
    };
    loginUser(userData);
  };

  const handleGuestLogin = async () => {
    setError("");
    loginUser({ email: "guest@gmail.com", password: "123456" });
  };
  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="login-page">
      <div className="login-main">
        <AuthHeader />
        <div className="login-form-container">
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
              <label>Email</label>
              <input
                type="email"
                value={email}
                required
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
              />
            </div>

            <div className="login-form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                required
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
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
            {error && <p className="error-msg">{error}</p>}
          </form>

          <div className="login-footer">
            <p>Don't have an account?</p>
            <Link to="/register" className="navigator-link">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
