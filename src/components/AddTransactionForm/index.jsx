import { useState, useContext } from "react";
import "./index.css";
import Cookies from "js-cookie";
import HrmsContext from "../../context";

const AddExpenseForm = () => {
  const { setShowTransactionForm, categoryList } = useContext(HrmsContext);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    // title, amount, category, type, date
    const transactionData = {
      title: title,
      amount: amount,
      category: category,
      date: date,
      type: "expense", // we are present building only expenses
    };
    const token = Cookies.get("jwt_token");
    try {
      const response = await fetch("http://localhost:5000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || "transaction Created !");
        setTitle("");
        setAmount("");
        setCategory("");
        setDate("");
        setError("");
        setShowTransactionForm(false);
      }
      if (response.status === 400) {
        const data = await response.json();
        setError(data.message || "Bad  Input Values");
      }
    } catch (error) {
      alert("Server Error");
      console.log("error", error);
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
            name="title"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            className="form-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            className="dropdown"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Previous</option>
            {categoryList.map((each, index) => (
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
            name="Category"
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
            name="date"
            className="form-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="buttons-wrapper">
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

        <p className="error-msg">{error}</p>
      </form>
    </div>
  );
};

export default AddExpenseForm;
