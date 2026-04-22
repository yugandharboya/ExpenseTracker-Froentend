import "./index.css";
import { useState, useContext } from "react";
import { DollarSign } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const BASE_URL = "https://expensetracker-backend-lvzi.onrender.com";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regError, setRegError] = useState(null);
  const [regSuccess, setRegSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      name,
      email,
      password,
    };
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (response.status === 400) {
        setRegError(data.message);
      }

      if (response.status === 201) {
        alert(data.message);
        navigate("/");
        Cookies.set("jwt_token", data.token);
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setRegError(error.message);
      console.log("error", error);
    }
  };

  return (
    <div className="register-container">
      <div className="login-page-header">
        <div className="logo-box">
          <DollarSign size={20} color="white" />
        </div>
        <h1>ExpenseFlow</h1>
        <p>Track your finances with clarity</p>
      </div>
      <div className="register-card">
        <h2 className="register-title">Register</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="register-form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="register-form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button className="register-button" type="submit">
            Register
          </button>
          <p className="error-msg">{regError}</p>
        </form>
        <div className="register-footer">
          <p>Do you have an account?</p>{" "}
          <Link to="/login" className="navigator-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
