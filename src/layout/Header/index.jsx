import "./index.css";
import Cookies from "js-cookie";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { DollarSign } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    Cookies.remove("jwt_token");
  };
  return (
    <div className="header">
      <div className="header-desktop-wrapper">
        <div className="header-left">
          <div className="logo-box">
            <DollarSign size={20} color="white" />
          </div>
          <h3 className="header-title">ExpenseFlow</h3>
        </div>

        <div className="header-nav-pages-desktop">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Dashboard
          </Link>
          <Link
            to="/transactions"
            className={`nav-link ${location.pathname === "/transactions" ? "active" : ""}`}
          >
            Transactions
          </Link>
        </div>

        <div className="header-right">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="header-nav-pages-mobile">
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          Dashboard
        </Link>
        <Link
          to="/transactions"
          className={`nav-link ${location.pathname === "/transactions" ? "active" : ""}`}
        >
          Transactions
        </Link>
      </div>
    </div>
  );
};

export default Header;
