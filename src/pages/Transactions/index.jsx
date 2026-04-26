import "./index.css";
import { useContext, useEffect } from "react";
import Filters from "../../components/Filters";
import TransactionsHeader from "../../components/TransactionsHeader";
import TransactionCard from "../../components/TransactionCard";
import AddExpenseForm from "../../components/AddTransactionForm";
import EditTransactionForm from "../../components/EditTransactionForm";
import LoadingView from "../../components/LoadingView";
import ErrorView from "../../components/ErrorView";

import { TransactionContext } from "../../context/TransactionContext";
import { DashboardContext } from "../../context/DashboardContext";
import { UIContext } from "../../context/UIContext";
import { FilterContext } from "../../context/FilterContext";

const Transactions = () => {
  const { showTransactionForm, editTransaction } = useContext(UIContext);
  const { searchValue, categoryValue, startDate, endDate } =
    useContext(FilterContext);
  const {
    transactionsList,
    getTransactions,
    hasMore,
    page,
    setPage,
    transactionState,
  } = useContext(TransactionContext);
  const { categoryList, getCategories } = useContext(DashboardContext);

  useEffect(() => {
    getCategories();
  }, [categoryList.length]);
  useEffect(() => {
    getTransactions(page, 10);
  }, [page, startDate, endDate, searchValue, categoryValue]);

  return (
    <div className="transactions-page">
      {showTransactionForm && <AddExpenseForm />}
      {editTransaction && <EditTransactionForm transaction={editTransaction} />}

      <TransactionsHeader />
      <Filters />

      {transactionState.loading ? (
        <LoadingView />
      ) : transactionState.error ? (
        <ErrorView />
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
