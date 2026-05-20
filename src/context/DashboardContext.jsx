import { useState, createContext, useContext } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "../constants/constants";
import { FilterContext } from "./FilterContext";
import { useNavigate } from "react-router-dom";
export const DashboardContext = createContext();

export const DashboardContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const { MonthStartDate, MonthEndDate } = useContext(FilterContext);
  const [categoryList, setCategoryList] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);

  const getCategories = async () => {
    const token = Cookies.get("jwt_token");

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    let url = `${BASE_URL}/dashboard/category?startDate=${MonthStartDate}&endDate=${MonthEndDate}`;
    try {
      const response = await fetch(url, options);

      if (response.status === 401 || response.status === 403) {
        Cookies.remove("jwt_token");
        navigate("/login");
        return true;
      }

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
    let url = `${BASE_URL}/dashboard/total?startDate=${MonthStartDate}&endDate=${MonthEndDate}`;
    try {
      const response = await fetch(url, options);

      if (response.status === 401 || response.status === 403) {
        Cookies.remove("jwt_token");
        navigate("/login");
        return true;
      }

      if (response.ok) {
        const data = await response.json();
        setTotalSpent(data.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        getCategories,
        categoryList,
        getTotalExpenses,
        totalSpent,
        setTotalSpent,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
