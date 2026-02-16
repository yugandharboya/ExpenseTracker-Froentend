import "./App.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import SummeryCards from "./components/SummaryCards";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Transactions from "./pages/Transactions";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt_token");

    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      // console.log("currentTime", currentTime);
      // console.log("decoded.exp", decoded.exp);
      if (decoded.exp < currentTime) {
        navigate("/login");
        // Cookies.remove("jwt_token");
      } else {
        // console.log("Token valid");
      }
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/transactions"
          element={
            <Layout>
              <Transactions />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
