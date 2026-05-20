import "./index.css";
import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { Pointer, RefreshCw } from "lucide-react";
import { DashboardContext } from "../../context/DashboardContext";
import { TransactionContext } from "../../context/TransactionContext";
import { FilterContext } from "../../context/FilterContext";
import { format, startOfMonth, endOfMonth } from "date-fns";

const SummeryCards = () => {
  const {
    MonthStartDate,
    MonthEndDate,
    setMonthStartDate,
    setMonthEndDate,
    selectedYear,
    setSelectedMonth,
    selectedMonth,
  } = useContext(FilterContext);
  const { getTransactions, transactionsList } = useContext(TransactionContext);
  const { getTotalExpenses, totalSpent } = useContext(DashboardContext);

  const handleMonthChange = (e) => {
    const monthIndex = e.target.value;
    const newDate = new Date(selectedYear, monthIndex);
    const newStartDate = format(startOfMonth(newDate), "yyyy-MM-dd");
    const newEndDate = format(endOfMonth(newDate), "yyyy-MM-dd");

    setMonthStartDate(newStartDate);
    setMonthEndDate(newEndDate);
    setSelectedMonth(monthIndex);
  };
  const handleRfreshFilters = () => {
    setSelectedMonth("");
    setMonthStartDate("");
    setMonthEndDate("");
  };

  return (
    <div className="summary-cards-container">
      <div className="summary-card">
        <h3 className="summery-card-title">Total Expenses</h3>
        <p className="summery-card-value">-₹ {totalSpent}</p>
        <div className="summery-card-wrapper">
          <select
            className="month-selection"
            onChange={handleMonthChange}
            value={selectedMonth}
          >
            <option value="">{`Month / ${selectedYear}`}</option>
            <option value={0}>January {selectedYear}</option>
            <option value={1}>February {selectedYear}</option>
            <option value={2}>March {selectedYear}</option>
            <option value={3}>April {selectedYear}</option>
            <option value={4}>May {selectedYear}</option>
            <option value={5}>June {selectedYear}</option>
            <option value={6}>July {selectedYear}</option>
            <option value={7}>August {selectedYear}</option>
            <option value={8}>September {selectedYear}</option>
            <option value={9}>October {selectedYear}</option>
            <option value={10}>November {selectedYear}</option>
            <option value={11}>December {selectedYear}</option>
          </select>
          <RefreshCw
            className={`dashboard-refresh ${selectedMonth ? "" : "hide-refresh"}`}
            onClick={handleRfreshFilters}
          />
        </div>
      </div>
    </div>
  );
};
export default SummeryCards;
