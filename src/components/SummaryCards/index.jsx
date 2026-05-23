import "./index.css";
import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { Pointer, RefreshCw } from "lucide-react";
import { DashboardContext } from "../../context/DashboardContext";
import { TransactionContext } from "../../context/TransactionContext";
import { FilterContext } from "../../context/FilterContext";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { TailSpin } from "react-loader-spinner";

const SummeryCards = () => {
  const { selectedYear } = useContext(FilterContext);
  const {
    dashStartDate,
    dashEndDate,
    setDashStartDate,
    setDashEndDate,
    dashSelectedMonth,
    setDashSelectedMonth,
  } = useContext(DashboardContext);
  const { getTransactions, transactionsList } = useContext(TransactionContext);
  const { getTotalExpenses, totalExpense, totalLoading, totalError } =
    useContext(DashboardContext);

  const handleMonthChange = (e) => {
    const monthIndex = e.target.value;
    const newDate = new Date(selectedYear, monthIndex);
    const newStartDate = format(startOfMonth(newDate), "yyyy-MM-dd");
    const newEndDate = format(endOfMonth(newDate), "yyyy-MM-dd");

    setDashStartDate(newStartDate);
    setDashEndDate(newEndDate);
    setDashSelectedMonth(monthIndex);
  };
  const handleRfreshFilters = () => {
    setDashSelectedMonth("");
    setDashStartDate("");
    setDashEndDate("");
  };

  const localLoadingView = () => {
    return (
      <TailSpin
        height="30"
        width="30"
        color="#00BFFF"
        ariaLabel="loading"
        visible={true}
      />
    );
  };
  return (
    <div className="summary-card">
      <h3 className="summery-card-title">Total Expenses</h3>

      {totalLoading ? (
        localLoadingView()
      ) : totalError ? (
        <p className="error-view-message">{totalError}</p>
      ) : (
        <p className="summery-card-value">-₹ {totalExpense}</p>
      )}

      <div className="summery-card-wrapper">
        <select
          className="month-selection"
          onChange={handleMonthChange}
          value={dashSelectedMonth}
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
          className={`dashboard-refresh ${dashSelectedMonth ? "" : "hide-refresh"}`}
          onClick={handleRfreshFilters}
        />
      </div>
    </div>
  );
};
export default SummeryCards;
