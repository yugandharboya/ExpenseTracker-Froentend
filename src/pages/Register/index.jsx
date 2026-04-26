import "./index.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AuthHeader from "../../components/authHeader";
import { BASE_URL } from "../../constants/constants";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim() || !name.trim()) {
      setError("All fields are required");
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
      name: name.trim(),
    };

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
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
        setError(data.message || "Registration failed Try Again");
        return;
      }

      if (data.token) {
        Cookies.set("jwt_token", data.token, { expires: 1 });
      }

      navigate("/");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError("network error. Try again");
      console.log(error);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <AuthHeader />
        <h2 className="register-title">Register</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="register-button" type="submit">
            Register
          </button>

          {error && <p className="error-msg">{error}</p>}
        </form>

        <div className="register-footer">
          <p>Do you have an account?</p>
          <Link to="/login" className="navigator-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
