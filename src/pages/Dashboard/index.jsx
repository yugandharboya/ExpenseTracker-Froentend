import "./index.css";
import { useEffect, useState } from "react";
import SummeryCards from "../../components/SummaryCards";
import Filters from "../../components/Filters";
import AddTransactionForm from "../../components/AddTransactionForm";
import TransactionCard from "../../components/TransactionCard";
import HrmsContext from "../../context";
import { useContext } from "react";
import CategoryCard from "../../components/CategoryCard";

const Dashboard = () => {
  const {
    transactionsList,
    getTransactions,
    searchValue,
    categoryValue,
    getCategoryWiseExpense,
    showTransactionForm,
  } = useContext(HrmsContext);

  useEffect(() => {
    getTransactions();
    getCategoryWiseExpense();
  }, []);
  return (
    <div className="dashboard">
      <SummeryCards />
      <h2>Spending by Category</h2>
      <CategoryCard />
      <div className="dashboard-wrapper">
        {showTransactionForm && <AddTransactionForm />}
        <div className="dashboard-main">
          <h2>Recent Transactions</h2>
          {transactionsList.map((item) => (
            <TransactionCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
