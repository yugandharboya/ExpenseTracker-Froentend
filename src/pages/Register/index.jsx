import "./index.css";
import { useState, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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
      const response = await fetch(`http://localhost:5000/auth/register`, {
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
      <div className="register-card">
        <h2 className="register-title">Register</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

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

          <button className="register-button" type="submit">
            Register
          </button>
          <p className="error-msg">{regError}</p>
        </form>
        <div className="footer">
          Do you have an account?{" "}
          <Link to="/login" className="navigator-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
