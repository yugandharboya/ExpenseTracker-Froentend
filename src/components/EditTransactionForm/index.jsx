import "./index.css";
import { useState, useEffect, useContext } from "react";
import HrmsContext from "../../context";
import Cookies from "js-cookie";

const BASE_URL = "https://expensetracker-backend-lvzi.onrender.com";

const EditTransactionForm = ({ transaction }) => {
  const { setEditTransaction, getTransactions } = useContext(HrmsContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  // const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(transaction.title);
    setAmount(transaction.amount);
    setCategory(transaction.category);
    // setType(transaction.type);
    setDate(transaction.date);
  }, [transaction]);

  const token = Cookies.get("jwt_token");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      title,
      amount,
      category,
      type: "expense",
      date,
    };

    try {
      const response = await fetch(
        `${BASE_UR}/transactions/${transaction.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        },
      );
      if (response.status === 404 || response.status === 400) {
        const data = await response.json();
        setError(data.message);
      }
      if (response.status === 200) {
        setEditTransaction(null);
        getTransactions();
        alert("Transaction updated successfully");
      }
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  return (
    <div className="edit-transaction-container">
      <div className="edit-transaction-card">
        <h2>Edit Transaction</h2>

        <form onSubmit={handleSubmit} className="edit-transaction-form">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          {/* <label>Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select> */}

          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <div className="edit-actions">
            <button type="submit" className="update-btn">
              Update
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setEditTransaction(null)}
            >
              Cancel
            </button>
          </div>
        </form>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default EditTransactionForm;
