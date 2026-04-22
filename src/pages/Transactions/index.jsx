import "./index.css";
import { useContext, useEffect } from "react";

import Filters from "../../components/Filters";
import TransactionsHeader from "../../components/TransactionsHeader";
import TransactionCard from "../../components/TransactionCard";
import AddExpenseForm from "../../components/AddTransactionForm";
import EditTransactionForm from "../../components/EditTransactionForm";
import LoadingView from "../../components/LoadingView";
import ErrorView from "../../components/ErrorView";

import HrmsContext from "../../context";

const Transactions = () => {
  const {
    showTransactionForm,
    transactionsList,
    getTransactions,
    searchValue,
    categoryValue,
    hasMore,
    page,
    setPage,
    editTransaction,
    loading,
    errorView,
    getCategoryWiseExpense,
    categoryList,
  } = useContext(HrmsContext);

  useEffect(() => {
    getCategoryWiseExpense();
  }, [categoryList.length]);
  useEffect(() => {
    getTransactions(page, 10);
  }, [page, searchValue, categoryValue]);

  return (
    <div className="transactions-page">
      {showTransactionForm && <AddExpenseForm />}
      {editTransaction && <EditTransactionForm transaction={editTransaction} />}

      <TransactionsHeader />
      <Filters />

      {errorView ? (
        <ErrorView />
      ) : loading ? (
        <LoadingView />
      ) : transactionsList.length === 0 ? (
        <h1 className="empty-text">No Transactions Added yet</h1>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Transactions;
