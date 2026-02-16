import { createContext, useState } from "react";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:5000";
// const BASE_URL = "https://hrms-backend-0bid.onrender.com";

const HrmsContext = createContext();

export const HrmsContextProvider = ({ children }) => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [transactionsList, setTransactionsList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getTransactions = async () => {
    const token = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        `http://localhost:5000/transactions?page=${page}&limit=10&search=${searchValue}&category=${categoryValue}`,
        options,
      );
      if (response.ok) {
        const data = await response.json();
        if (page === 1) {
          setTransactionsList(data.transactions);
        } else {
          setTransactionsList((prev) => [...prev, ...data.transactions]);
        }
        setHasMore(data.hasMore);
      }
    } catch (error) {
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
      const response = await fetch(
        "http://localhost:5000/dashboard/category",
        options,
      );

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
      const response = await fetch(
        "http://localhost:5000/dashboard/total",
        options,
      );
      if (response.ok) {
        const data = await response.json();
        setTotalSpent(data.total);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
        categoryList,
        setCategoryList,
      }}
    >
      {children}
    </HrmsContext.Provider>
  );
};

export default HrmsContext;
