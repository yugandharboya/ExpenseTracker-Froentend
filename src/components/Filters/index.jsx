import "./index.css";
import { format, startOfMonth, endOfMonth } from "date-fns";
// http://localhost:5000/transactions?page=2&limit=15&search=grocery&category=Food
import { useState, useContext } from "react";
import HrmsContext from "../../context";
const Filters = () => {
  const {
    searchValue,
    setSearchValue,
    categoryValue,
    setCategoryValue,
    categoryList,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedMonth,
    setSelectedMonth,
    handleMonth,
  } = useContext(HrmsContext);

  const monthIndex = selectedMonth.getMonth();
  const currentYear = selectedMonth.getFullYear();

  // const handleMonthChange = (e) => {
  //   const currentDate = new Date(startDate);
  //   const year = currentDate.getFullYear();
  //   const month = e.target.value;
  //   const updatedDate = new Date(`${year}-${month}`);
  //   const start = format(startOfMonth(updatedDate), "yyyy-MM-dd");
  //   const end = format(endOfMonth(updatedDate), "yyyy-MM-dd");
  //   console.log("start", start, "end", end);
  //   setStartDate(start);
  //   setEndDate(end);
  // };

  return (
    <div className="filters-container">
      <h1 className="filter-title">Filters & Search</h1>
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
          onChange={handleMonth}
          value={monthIndex}
        >
          <option value={0}>January {currentYear}</option>
          <option value={1}>February {currentYear}</option>
          <option value={2}>March {currentYear}</option>
          <option value={3}>April {currentYear}</option>
          <option value={4}>May {currentYear}</option>
          <option value={5}>June {currentYear}</option>
          <option value={6}>July {currentYear}</option>
          <option value={7}>August {currentYear}</option>
          <option value={8}>September {currentYear}</option>
          <option value={9}>October {currentYear}</option>
          <option value={10}>November {currentYear}</option>
          <option value={11}>December {currentYear}</option>
        </select>
        <select className="dropdown-category">
          <option value="">SELECT YEAR</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
        <img src="/public/filter.png" alt="filter" className="filter-icon" />
      </div>
    </div>
  );
};

export default Filters;
