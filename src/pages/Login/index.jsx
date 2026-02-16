import "./index.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      email,
      password,
    };
    console.log("data", userData);
    try {
      const response = await fetch(`http://localhost:5000/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.status === 400) {
        setError(data.message || "Bad Request");
      }

      if (response.status === 200) {
        alert(data.message);
        Cookies.set("jwt_token", data.token);
        navigate("/");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setError(error.message);
      console.log("error", error);
    }
  };

  return (
    <div className="login-bg-container">
      <div className="login-container ">
        <h2 className="login-title">Login</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button className="login-button" type="submit">
            Login
          </button>
          <p className="error-msg">{error}</p>
        </form>

        <div className="footer">
          Don't have an account?{" "}
          <Link to="/register" className="navigator-link">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
