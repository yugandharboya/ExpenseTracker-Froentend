const BASE_URL = "https://expensetracker-backend-lvzi.onrender.com";

import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { useEffect } from "react";

const currentDate = new Date();
const start = format(startOfMonth(currentDate), "yyyy-MM-dd");
const end = format(endOfMonth(currentDate), "yyyy-MM-dd");

const HrmsContext = createContext();

export const HrmsContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [transactionsList, setTransactionsList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [editTransaction, setEditTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorView, setErrorView] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);

  const handleAuthError = (response) => {
    if (response.status === 401 || response.status === 403) {
      Cookies.remove("jwt_token");
      navigate("/login");
      return true;
    }
    return false;
  };

  const getTransactions = async (page = 1, limit = 10) => {
    const token = Cookies.get("jwt_token");
    setLoading(true);

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

      if (handleAuthError(response)) return;

      if (response.ok) {
        setLoading(false);
        setErrorView(false);
        const data = await response.json();

        if (page === 1) {
          setTransactionsList(data.transactions);
        } else {
          setTransactionsList((prev) => [...prev, ...data.transactions]);
        }

        setHasMore(data.hasMore);
      }
    } catch (error) {
      setErrorView(true);
      console.log(error);
    }
  };

  const getCategoryWiseExpense = async () => {
    const token = Cookies.get("jwt_token");

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(`${BASE_URL}/dashboard/category`, options);

      if (handleAuthError(response)) return;

      if (response.ok) {
        const data = await response.json();
        setCategoryList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalExpenses = async () => {
    const token = Cookies.get("jwt_token");

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(`${BASE_URL}/dashboard/total`, options);

      if (handleAuthError(response)) return;

      if (response.ok) {
        const data = await response.json();
        setTotalSpent(data.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMonth = (event) => {
    const monthIndex = event.target.value;
    const updatedMonth = new Date(selectedMonth.getFullYear(), monthIndex, 1);
    setSelectedMonth(updatedMonth);
  };
  useEffect(() => {
    const monthStart = format(startOfMonth(selectedMonth), "yyyy-MM-dd");
    const monthEnd = format(endOfMonth(selectedMonth), "yyyy-MM-dd");
    setStartDate(monthStart);
    setEndDate(monthEnd);
  }, [selectedMonth]);

  useEffect(() => {
    getTransactions();
  }, [startDate, endDate, searchValue, categoryValue]);
  useEffect(() => {
    getTotalExpenses();
  }, [startDate, endDate]);
  return (
    <HrmsContext.Provider
      value={{
        showTransactionForm,
        setShowTransactionForm,
        transactionsList,
        setTransactionsList,
        getTransactions,
        searchValue,
        setSearchValue,
        categoryValue,
        setCategoryValue,
        getCategoryWiseExpense,
        categoryList,
        setCategoryList,
        getTotalExpenses,
        totalSpent,
        setTotalSpent,
        hasMore,
        setHasMore,
        page,
        setPage,
        editTransaction,
        setEditTransaction,
        loading,
        setLoading,
        errorView,
        setErrorView,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        selectedMonth,
        setSelectedMonth,
        handleMonth,
      }}
    >
      {children}
    </HrmsContext.Provider>
  );
};

export default HrmsContext;
