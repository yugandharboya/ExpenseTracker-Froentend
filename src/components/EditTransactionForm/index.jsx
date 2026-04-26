import "./index.css";
import { BASE_URL } from "../../constants/constants";

import { useState, useEffect, useContext } from "react";
import { UIContext } from "../../context/UIContext";
import { TransactionContext } from "../../context/TransactionContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const EditTransactionForm = ({ transaction }) => {
  const navigate = useNavigate();

  const { setEditTransaction } = useContext(UIContext);
  const { getTransactions } = useContext(TransactionContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  // const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("jwt_token");
    setError("");
    if (!token) {
      navigate("/");
      return;
    }
    const amountNumber = Number(amount);
    if (
      !title.trim() ||
      isNaN(amountNumber) ||
      amountNumber <= 0 ||
      !category.trim() ||
      !date
    ) {
      setError("Fill All Fields with valid values");
      return;
    }
    const transactionData = {
      title: title.trim(),
      amount: amountNumber,
      category: category.trim(),
      date: date,
      type: "expense", // present buiding only expense tracker so we wrote type default is expense
    };

    try {
      const response = await fetch(
        `${BASE_URL}/transactions/${transaction.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(transactionData),
        },
      );

      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        setError(data.message || "Update failed");
        return;
      }

      setEditTransaction(false);
      await getTransactions();
      alert("Transaction updated successfully");
    } catch (error) {
      setError("network error. Please Try again");
      console.log(error);
    }
  };

  useEffect(() => {
    setTitle(transaction.title || "");
    setAmount(transaction.amount || "");
    setCategory(transaction.category || "");
    // setType(transaction.type);
    const formateDate = transaction.date.split("T")[0];
    setDate(formateDate || "");
  }, [transaction]);

  return (
    <div className="edit-transaction-container">
      <div className="edit-transaction-card">
        <h2>Edit Transaction</h2>

        <form onSubmit={handleSubmit} className="edit-transaction-form">
          <div className="edit-form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="edit-form-group">
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="edit-form-group">
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          {/* <div className="edit-form-group">
            <label>Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          </div> */}
          <div className="edit-form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="edit-actions">
            <button type="submit" className="update-btn">
              Update
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setEditTransaction(false)}
            >
              Cancel
            </button>
          </div>
        </form>
        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  );
};

export default EditTransactionForm;
