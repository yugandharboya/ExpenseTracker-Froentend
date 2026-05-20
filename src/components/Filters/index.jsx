import "./index.css";
import { setMonth, setYear, format, startOfMonth, endOfMonth } from "date-fns";
import { useContext, useState } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import { FilterContext } from "../../context/FilterContext";

const Filters = () => {
  const currentYear = new Date().getFullYear();
  const { categoryList } = useContext(DashboardContext);

  const {
    searchValue,
    setSearchValue,
    categoryValue,
    setCategoryValue,
    MonthStartDate,
    setMonthStartDate,
    MonthEndDate,
    setMonthEndDate,
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
  } = useContext(FilterContext);

  const startYear = 2025;
  const years = [];
  for (let x = startYear; x <= currentYear; x++) {
    years.push(x);
  }

  const handleMonthChange = (e) => {
    const monthIndex = e.target.value;
    const newDate = new Date(selectedYear, monthIndex);
    const newStartDate = format(startOfMonth(newDate), "yyyy-MM-dd");
    const newEndDate = format(endOfMonth(newDate), "yyyy-MM-dd");

    setSelectedMonth(monthIndex);
    setMonthStartDate(newStartDate);
    setMonthEndDate(newEndDate);
  };

  const handleChangeYear = (e) => {
    const year = e.target.value;
    const updatedDate = setYear(MonthStartDate, year);
    const newStartDate = format(startOfMonth(updatedDate), "yyyy-MM-dd");
    const newEndDate = format(endOfMonth(updatedDate), "yyyy-MM-dd");

    setSelectedYear(year);
    setMonthStartDate(newStartDate);
    setMonthEndDate(newEndDate);
  };

  const handleRfreshFilters = () => {
    setSearchValue("");
    setCategoryValue("");
    setSelectedMonth("");
    setSelectedYear(currentYear);
    setMonthStartDate("");
    setMonthEndDate("");
  };

  return (
    <div className="filters-container">
      <div className="filters-header">
        <h1 className="filter-title">Filters & Search</h1>
        <button
          className="refresh-search-result-btn"
          onClick={handleRfreshFilters}
        >
          Refresh
        </button>
      </div>
      <div className="filter-row-container">
        <input
          type="search"
          placeholder="Search Transactions"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input-element"
        />
        <select
          value={categoryValue}
          onChange={(e) => setCategoryValue(e.target.value)}
          className="dropdown-category"
        >
          <option value="">SELECT CATEGORY</option>

          {categoryList.map((each, index) => (
            <option key={index} value={each.category}>
              {each.category}
            </option>
          ))}
        </select>
        <select
          className="month-selection"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option value="">SELECT MONTH</option>
          <option value={0}>January {selectedYear}</option>
          <option value={1}>February {selectedYear}</option>
          <option value={2}>March {selectedYear}</option>
          <option value={3}>April {selectedYear}</option>
          <option value={4}>May {selectedYear}</option>
          <option value={5}>June {selectedYear}</option>
          <option value={6}>July {selectedYear}</option>
          <option value={7}>August {selectedYear}</option>
          <option value={8}>September {selectedYear}</option>
          <option value={9}>October {selectedYear}</option>
          <option value={10}>November {selectedYear}</option>
          <option value={11}>December {selectedYear}</option>
        </select>
        <select
          className="dropdown-category"
          onChange={handleChangeYear}
          value={selectedYear}
        >
          <option value="">SELECT YEAR</option>
          {(years || []).map((e) => (
            <option key={e}>{e}</option>
          ))}
        </select>
        {/* <img src="/public/filter.png" alt="filter" className="filter-icon" /> */}
      </div>
    </div>
  );
};

export default Filters;
