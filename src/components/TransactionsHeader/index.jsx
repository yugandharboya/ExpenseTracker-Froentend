import { useState, useContext } from "react";
import "./index.css";
import HrmsContext from "../../context";

const TransactionsHeader = () => {
  const { setShowTransactionForm } = useContext(HrmsContext);
  return (
    <div className="transactions-header">
      <div className="transactions-header-left">
        <h2 className="transactions-title">Transaction Explorer</h2>
        <p className="transactions-subtitle">
          Search and filter your expense history
        </p>
      </div>

      <button
        className="transaction-header-btn"
        onClick={() => setShowTransactionForm(true)}
      >
        Add Transaction
      </button>
    </div>
  );
};

export default TransactionsHeader;
