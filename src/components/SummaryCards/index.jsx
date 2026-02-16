import "./index.css";
import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import HrmsContext from "../../context";

const SummeryCards = () => {
  const { getTotalExpenses, totalSpent } = useContext(HrmsContext);
  useEffect(() => {
    getTotalExpenses();
  }, []);
  return (
    <div className="summary-cards-container">
      <div className="summary-card">
        <h3 className="summery-card-title">Total Income</h3>
        <p className="summery-card-value">0</p>
      </div>
      <div className="summary-card">
        <h3 className="summery-card-title">Total Spent</h3>
        <p className="summery-card-value">-₹ {totalSpent}</p>
      </div>
    </div>
  );
};
export default SummeryCards;
