import { useState, useEffect, createContext, useContext } from "react";
import { format, startOfMonth, endOfMonth } from "date-fns";

export const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
  const currentYear = new Date().getFullYear();

  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  const [MonthStartDate, setMonthStartDate] = useState("");
  const [MonthEndDate, setMonthEndDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(currentYear);

  return (
    <FilterContext.Provider
      value={{
        searchValue,
        setSearchValue,

        categoryValue,
        setCategoryValue,

        MonthStartDate,
        setMonthStartDate,

        MonthEndDate,
        setMonthEndDate,

        selectedMonth,
        setSelectedMonth,

        selectedYear,
        setSelectedYear,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
