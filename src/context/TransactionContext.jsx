import { useState, createContext, useContext } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import { FilterContext } from "../context/FilterContext";

export const TransactionContext = createContext();
export const TransactionContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const { searchValue, categoryValue, startDate, endDate } =
    useContext(FilterContext);
  const [transactionsList, setTransactionsList] = useState([]);

  const [transactionState, setTransactionState] = useState({
    loading: false,
    error: "",
  });
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const getTransactions = async (page = 1, limit = 10) => {
    const token = Cookies.get("jwt_token");
    setTransactionState({ loading: true, error: "" });

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        `${BASE_URL}/transactions?page=${page}&limit=${limit}&search=${searchValue}&category=${categoryValue}&startDate=${startDate}&endDate=${endDate}`,
        options,
      );

      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.status === 401 || response.status === 403) {
        Cookies.remove("jwt_token");
        navigate("/login");
        setTransactionState({
          loading: false,
          error: data.message || "something went wrong",
        });
        return true;
      }

      if (!response.ok) {
        setTransactionState({
          loading: false,
          error: data.message || "something went wrong ",
        });
        return;
      }

      setTransactionState({
        loading: false,
        error: "",
      });

      if (page === 1) {
        setTransactionsList(data.transactions);
      } else {
        setTransactionsList((prev) => [...prev, ...data.transactions]);
      }
      setHasMore(data.hasMore);
    } catch (error) {
      console.log(error);
      setTransactionState({
        loading: false,
        error: "Network Error. Please try agin",
      });
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        getTransactions,
        transactionsList,
        setTransactionsList,
        hasMore,
        setHasMore,
        page,
        setPage,
        transactionState,
        setTransactionState,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
