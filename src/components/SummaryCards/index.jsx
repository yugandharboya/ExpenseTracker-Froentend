import "./index.css";
import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { format } from "date-fns";

import HrmsContext from "../../context";

const SummeryCards = () => {
  const {
    getTotalExpenses,
    totalSpent,
    selectedMonth,
    setSelectedMonth,
    getTransactions,
    handleMonth,
  } = useContext(HrmsContext);

  const monthIndex = selectedMonth.getMonth();
  const currentYear = selectedMonth.getFullYear();

  useEffect(() => {
    getTransactions();
    // getTotalExpenses();
  }, []);
  return (
    <div className="summary-cards-container">
      <div className="summary-card">
        <h3 className="summery-card-title">Total Expenses</h3>
        <p className="summery-card-value">-₹ {totalSpent}</p>
        <select
          className="month-selection"
          onChange={handleMonth}
          value={monthIndex}
        >
          <option value={0}>January {currentYear}</option>
          <option value={1}>February {currentYear}</option>
          <option value={2}>March {currentYear}</option>
          <option value={3}>April {currentYear}</option>
          <option value={4}>May {currentYear}</option>
          <option value={5}>June {currentYear}</option>
          <option value={6}>July {currentYear}</option>
          <option value={7}>August {currentYear}</option>
          <option value={8}>September {currentYear}</option>
          <option value={9}>October {currentYear}</option>
          <option value={10}>November {currentYear}</option>
          <option value={11}>December {currentYear}</option>
        </select>
      </div>
    </div>
  );
};
export default SummeryCards;
