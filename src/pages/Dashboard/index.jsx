import "./index.css";
import { useEffect, useContext } from "react";

import SummeryCards from "../../components/SummaryCards";
import Filters from "../../components/Filters";
import AddTransactionForm from "../../components/AddTransactionForm";
import TransactionCard from "../../components/TransactionCard";
import CategoryCard from "../../components/CategoryCard";
import LoadingView from "../../components/LoadingView";
import ErrorView from "../../components/ErrorView";

import HrmsContext from "../../context";

const Dashboard = () => {
  const {
    transactionsList,
    getTransactions,
    getCategoryWiseExpense,
    showTransactionForm,
    loading,
    errorView,
    selectedMonth,
  } = useContext(HrmsContext);

  useEffect(() => {
    getTransactions(1, 10);
    getCategoryWiseExpense();
  }, [selectedMonth]);

  return (
    <div className="dashboard-page">
      <div className="hero-card">
        <h2>Good morning, Yuga! 👋</h2>
        <p>Here's your financial overview</p>
      </div>

      <SummeryCards />

      <h1 className="summery-cards-heading">Spending by Category</h1>
      <CategoryCard />

      <div className="dashboard-wrapper">
        {showTransactionForm && <AddTransactionForm />}

        <h2 className="recent-transactions-heading">Recent Transactions </h2>

        <div className="dashboard-main">
          {errorView ? (
            <ErrorView />
          ) : loading ? (
            <LoadingView />
          ) : transactionsList.length === 0 ? (
            <h1 className="empty-text">No Transactions Added yet</h1>
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
