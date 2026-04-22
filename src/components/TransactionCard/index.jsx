const BASE_URL = "https://expensetracker-backend-lvzi.onrender.com";
import "./index.css";
import HrmsContext from "../../context";
import { useContext } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

const TransactionCard = ({ item }) => {
  const location = useLocation();

  const { title, amount, category, date } = item;
  const {
    setEditTransaction,
    getTransactions,
    getCategoryWiseExpense,
    getTotalExpenses,
  } = useContext(HrmsContext);
  const token = Cookies.get("jwt_token");

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/transactions/${item.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 404) {
        const data = await response.json();
        alert(data.message || "Transaction not found");
      }
      if (response.status === 200) {
        const data = await response.json();
        getTransactions();
        getCategoryWiseExpense();
        getTotalExpenses();
        alert(data.message || "Transaction deleted successfully");
      }
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };
  return (
    <div className="transaction-card">
      <div className="transaction-info">
        <div className="transaction-top">
          <span className="transaction-category">{category}</span>
          <h4 className="transaction-title">{title}</h4>
        </div>
        <p className="transaction-date">{date}</p>
        <div
          className={`${location.pathname === "/transactions" ? "transaction-card-btns" : "hide-transaction-card-btns"}`}
        >
          <button
            className="transaction-edit-btn"
            onClick={() => setEditTransaction(item)}
          >
            Edit
          </button>
          <button className="transaction-delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      <p className="transaction-amount">₹{amount}</p>
    </div>
  );
};

export default TransactionCard;
