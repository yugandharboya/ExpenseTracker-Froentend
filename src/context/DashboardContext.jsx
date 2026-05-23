import { useState, createContext, useContext } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "../constants/constants";
import { FilterContext } from "./FilterContext";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
export const DashboardContext = createContext();

export const DashboardContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [dashStartDate, setDashStartDate] = useState("");
  const [dashEndDate, setDashEndDate] = useState("");
  const [dashSelectedMonth, setDashSelectedMonth] = useState("");

  const [categoryList, setCategoryList] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [totalLoading, setTotalLoading] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [totalError, setTotalError] = useState(null);
  const [user, setUser] = useState({});
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [recentTransactionsLoading, setRecentTransactionsLoading] =
    useState(false);
  const [recentTransactionsError, setRecentTransactionsError] = useState("");

  const getCategories = async (startDate, endDate) => {
    const token = Cookies.get("jwt_token");
    setCategoriesLoading(true);
    setCategoryError(false);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    let url = `${BASE_URL}/dashboard/category-summary?startDate=${startDate}&endDate=${endDate}`;
    try {
      const response = await fetch(url, options);

      if (response.status === 401 || response.status === 403) {
        Cookies.remove("jwt_token");
        navigate("/login");
        return true;
      }

      if (response.ok) {
        const data = await response.json();
        setCategoriesLoading(false);
        setCategoryList(data);
      }
    } catch (error) {
      console.log(error);
      setCategoriesLoading(false);
      setCategoryError(true);
    }
  };

  const getTotalExpenses = async () => {
    const token = Cookies.get("jwt_token");
    setTotalLoading(true);
    setTotalError(null);

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let url = `${BASE_URL}/dashboard/summary?startDate=${dashStartDate}&endDate=${dashEndDate}`;
    try {
      const response = await fetch(url, options);

      if (response.status === 401 || response.status === 403) {
        Cookies.remove("jwt_token");
        navigate("/login");
        return true;
      }

      if (response.ok) {
        const data = await response.json();

        setTotalLoading(false);
        setTotalExpense(data.total);
      }
    } catch (error) {
      console.log(error);
      setTotalLoading(false);
      setTotalError("error !");
    }
  };
  const getRecentTransactions = async (limit) => {
    const token = Cookies.get("jwt_token");
    setRecentTransactionsLoading(true);
    setRecentTransactionsError("");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let url = `${BASE_URL}/dashboard/recent-transactions?limit=${limit}`;

    try {
      const response = await fetch(url, options);

      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }
      if (response.status === 401 || response.status === 403) {
        Cookies.remove("jwt_token");
        navigate("/login");
        setRecentTransactionsLoading(false);
        setRecentTransactionsError(data.message || "something went wrong");
        return;
      }
      if (!response.ok) {
        setRecentTransactionsLoading(false);
        setRecentTransactionsError(data.message || "something went wrong");
        return;
      }
      setRecentTransactionsLoading(false);
      setRecentTransactionsError("");

      const formattedTransactions = (data || []).map((transaction) => ({
        ...transaction,
        date: format(new Date(transaction.date), "yyyy-MM-dd"),
      }));
      setRecentTransactions(formattedTransactions);
    } catch (err) {
      console.log("Error: ", err);
      setRecentTransactionsLoading(false);
      setRecentTransactionsError("something went wrong");
    }
  };

  const getCurrentUser = async () => {
    const token = Cookies.get("jwt_token");

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${BASE_URL}/users/me`;
    try {
      const response = await fetch(url, options);

      const data = await response.json();

      if (response.ok) {
        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        getCurrentUser,
        dashStartDate,
        dashEndDate,
        setDashStartDate,
        setDashEndDate,
        dashSelectedMonth,
        setDashSelectedMonth,

        getCategories,
        categoryList,
        getTotalExpenses,
        totalExpense,
        setTotalExpense,
        categoriesLoading,
        totalLoading,
        categoryError,
        totalError,
        getRecentTransactions,
        recentTransactions,
        recentTransactionsLoading,
        recentTransactionsError,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
