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
  const {
    user,
    getCurrentUser,
    dashStartDate,
    dashEndDate,
    getCategories,
    getTotalExpenses,
    categoriesLoading,
    totalLoading,
    categoryError,
    totalError,
    categoryList,
    getRecentTransactions,
    recentTransactions,
    recentTransactionsLoading,
    recentTransactionsError,
  } = useContext(DashboardContext);
  const { transactionsList, getTransactions, transactionState } =
    useContext(TransactionContext);
  const { selectedYear, searchValue, categoryValue } =
    useContext(FilterContext);

  useEffect(() => {
    getCategories(dashStartDate, dashEndDate);
    getTotalExpenses();
  }, [dashStartDate, dashEndDate]);

  useEffect(() => {
    getRecentTransactions(10);
  }, []);
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="hero-card-section">
        <h2>Hellow {user.name}! 👋</h2>
        <p>Here’s your {selectedYear} financial summary</p>
      </div>
      <div className="summary-cards-section">
        <SummeryCards />
      </div>
      <h1 className="categories-heading">Spending by Category</h1>
      <div className="categories-section">
        {categoriesLoading ? (
          <div className="category-loading-section">
            <LoadingView />
          </div>
        ) : categoryError ? (
          <ErrorView />
        ) : categoryList.length === 0 ? (
          <p className="empty-text">No categories found</p>
        ) : (
          <CategoryCard />
        )}
      </div>

      <div className="dashboard-wrapper">
        <h2 className="recent-transactions-heading">Recent Transactions </h2>

        <div className="dashboard-main">
          {recentTransactionsLoading ? (
            <LoadingView />
          ) : recentTransactionsError ? (
            <ErrorView />
          ) : recentTransactions.length === 0 ? (
            <p className="empty-text">No recent transactions</p>
          ) : (
            recentTransactions.map((item) => (
              <TransactionCard item={item} key={item.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
