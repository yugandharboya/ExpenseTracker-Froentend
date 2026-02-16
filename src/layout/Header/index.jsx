import "./index.css";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import HrmsContext from "../../context";
import { useContext, useEffect } from "react";
const Header = () => {
  const navigate = useNavigate();
  const { totalSpent, getTotalExpenses } = useContext(HrmsContext);
  const handleLogout = () => {
    navigate("/login");
    Cookies.remove("jwt_token");
  };
  useEffect(() => {
    getTotalExpenses();
  }, []);
  return (
    <div className="header">
      <div className="header-left">
        <h3 className="header-title">Bellcorp Expense Tracker</h3>
        <p className="header-left-text">Track your expenses wisely</p>
      </div>
      <div className="header-nav">
        <div className="header-nav">
          <Link to="/" className="nav-link">
            Dashboard
          </Link>
          <Link to="/transactions" className="nav-link">
            Transactions
          </Link>
        </div>
      </div>

      <div className="header-right">
        <h3 className="header-right-title">Total Expenses</h3>
        <p className="header-spent-value">-₹{totalSpent}</p>
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Header;
