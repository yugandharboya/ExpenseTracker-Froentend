import "./index.css";
import { setMonth, setYear, format, startOfMonth, endOfMonth } from "date-fns";
import { useContext, useState } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import { FilterContext } from "../../context/FilterContext";

const Filters = () => {
  const { categoryList } = useContext(DashboardContext);
  const {
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
  } = useContext(FilterContext);

  const selectedMonthIndex = new Date(selectedMonthDate).getMonth();
  const selectedDateYear = new Date(selectedMonthDate).getFullYear();
  const currentYear = new Date().getFullYear();
  const startYear = 2025;
  const years = [];
  for (let x = startYear; x <= currentYear; x++) {
    years.push(x);
  }

  const handleMonthChange = (e) => {
    const monthIndex = e.target.value;
    const dateObjet = new Date(selectedMonthDate);
    const year = dateObjet.getFullYear();
    const newDate = new Date(year, monthIndex);
    const newStartDate = format(startOfMonth(newDate), "yyyy-MM-dd");
    const newEndDate = format(endOfMonth(newDate), "yyyy-MM-dd");
    setSelectedtMonthDate(newStartDate);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };
  const handleChangeYear = (e) => {
    const year = e.target.value;
    const currentDate = new Date(selectedMonthDate);
    const updatedDate = setYear(currentDate, year);
    const newStartDate = format(startOfMonth(updatedDate), "yyyy-MM-dd");
    const newEndDate = format(endOfMonth(updatedDate), "yyyy-MM-dd");

    setSelectedtMonthDate(format(updatedDate, "yyyy-MM-dd"));
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const handleRfreshFilters = () => {
    setSearchValue("");
    setCategoryValue("");
    const currentDate = new Date();
    const start = format(startOfMonth(currentDate), "yyyy-MM-dd");
    const end = format(endOfMonth(currentDate), "yyyy-MM-dd");
    const currentMonthDate = format(currentDate, "yyyy-MM-dd");
    setStartDate(start);
    setEndDate(end);
    setSelectedtMonthDate(currentMonthDate);
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
          value={selectedMonthIndex}
          onChange={handleMonthChange}
        >
          <option value={0}>January {selectedDateYear}</option>
          <option value={1}>February {selectedDateYear}</option>
          <option value={2}>March {selectedDateYear}</option>
          <option value={3}>April {selectedDateYear}</option>
          <option value={4}>May {selectedDateYear}</option>
          <option value={5}>June {selectedDateYear}</option>
          <option value={6}>July {selectedDateYear}</option>
          <option value={7}>August {selectedDateYear}</option>
          <option value={8}>September {selectedDateYear}</option>
          <option value={9}>October {selectedDateYear}</option>
          <option value={10}>November {selectedDateYear}</option>
          <option value={11}>December {selectedDateYear}</option>
        </select>
        <select
          className="dropdown-category"
          onChange={handleChangeYear}
          value={selectedDateYear}
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
