import "./index.css";
import { useEffect, useContext } from "react";

import SummeryCards from "../../components/SummaryCards";
import Filters from "../../components/Filters";
import AddTransactionForm from "../../components/AddTransactionForm";
import TransactionCard from "../../components/TransactionCard";
import CategoryCard from "../../components/CategoryCard";
import LoadingView from "../../components/LoadingView";
import ErrorView from "../../components/ErrorView";
import { DashboardContext } from "../../context/DashboardContext";
import { TransactionContext } from "../../context/TransactionContext";
import { FilterContext } from "../../context/FilterContext";
import { UIContext } from "../../context/UIContext";

const Dashboard = () => {
  const { getCategories, getTotalExpenses } = useContext(DashboardContext);
  const { transactionsList, getTransactions, transactionState } =
    useContext(TransactionContext);
  const { startDate, endDate, searchValue, categoryValue, selectedMonth } =
    useContext(FilterContext);

  useEffect(() => {
    getTransactions(1, 10);
    getCategories();
    getTotalExpenses();
  }, [startDate, endDate, searchValue, categoryValue]);

  return (
    <div className="dashboard-page">
      <div className="hero-card">
        <h2>Good morning, Yuga! 👋</h2>
        <p>Here's your financial overview</p>
      </div>

      <SummeryCards />

      <h1 className="categories-heading">Spending by Category</h1>
      <CategoryCard />

      <div className="dashboard-wrapper">
        <h2 className="recent-transactions-heading">Recent Transactions </h2>

        <div className="dashboard-main">
          {transactionState.loading ? (
            <LoadingView />
          ) : transactionState.error ? (
            <ErrorView />
          ) : transactionsList.length === 0 ? (
            <h2 className="empty-text">No Transactions Added yet</h2>
          ) : (
            transactionsList.map((item) => (
              <TransactionCard item={item} key={item.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
