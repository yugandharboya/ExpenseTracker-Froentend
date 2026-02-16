import "./index.css";
import Filters from "../../components/Filters";
import TransactionsHeader from "../../components/TransactionsHeader";
import TransactionCard from "../../components/TransactionCard";
import AddExpenseForm from "../../components/AddTransactionForm";
import HrmsContext from "../../context";
import { useContext, useEffect } from "react";

const Transactions = () => {
  const {
    showTransactionForm,
    setShowTransactionForm,
    transactionsList,
    getTransactions,
    searchValue,
    categoryValue,
    hasMore,
    page,
    setPage,
  } = useContext(HrmsContext);
  useEffect(() => {
    setPage(1);
  }, [searchValue, categoryValue]);
  useEffect(() => {
    getTransactions();
  }, [page, searchValue, categoryValue]);

  return (
    <div className="transactions-container">
      {showTransactionForm && <AddExpenseForm />}
      <TransactionsHeader />
      <Filters />
      {transactionsList.map((item) => (
        <TransactionCard item={item} key={item.id} />
      ))}
      {hasMore && (
        <button
          className="load-more-btn"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Load More...
        </button>
      )}
    </div>
  );
};

export default Transactions;
