import { useState, useEffect, createContext, useContext } from "react";
import { format, startOfMonth, endOfMonth } from "date-fns";

export const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const start = format(startOfMonth(currentDate), "yyyy-MM-dd");
  const end = format(endOfMonth(currentDate), "yyyy-MM-dd");
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [selectedMonthDate, setSelectedtMonthDate] = useState(currentDate);
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);

  return (
    <FilterContext.Provider
      value={{
        searchValue,
        setSearchValue,

        categoryValue,
        setCategoryValue,

        startDate,
        setStartDate,

        endDate,
        setEndDate,

        selectedMonthDate,
        setSelectedtMonthDate,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
