import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Cookies from "js-cookie";
import { UIContext } from "../../context/UIContext";
import { TransactionContext } from "../../context/TransactionContext";
import { DashboardContext } from "../../context/DashboardContext";
import { BASE_URL } from "../../constants/constants";

const AddExpenseForm = () => {
  const navigate = useNavigate();
  const { setShowTransactionForm } = useContext(UIContext);
  const { categoryList, getCategories, getTotalExpenses } =
    useContext(DashboardContext);
  const { getTransactions } = useContext(TransactionContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();

    const token = Cookies.get("jwt_token");
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
      const response = await fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transactionData),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        setError(data.message || "something went wrong");
        return;
      }

      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
      setError("");
      setShowTransactionForm(false);

      await Promise.all([
        getTransactions(),
        getCategories(),
        getTotalExpenses(),
      ]);
    } catch (error) {
      setError("network error. Please Try again");
      console.log(error);
    }
  };
  return (
    <div className="add-transaction">
      <h3 className="add-transaction-title">Add Expense</h3>

      <form className="add-transaction-form" onSubmit={submitForm}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            className="form-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Previous Category</label>
          <select
            className="dropdown"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Previous</option>
            {(categoryList || []).map((each, index) => (
              <option value={each.category} key={index}>
                {each.category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Add New Category</label>
          <input
            type="text"
            placeholder="Enter category name"
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="add-form-buttons">
          <button type="submit" className="add-transaction-btn">
            Add
          </button>

          <button
            type="button"
            className="cancel-transaction-btn"
            onClick={() => setShowTransactionForm(false)}
          >
            Cancel
          </button>
        </div>

        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
};

export default AddExpenseForm;
