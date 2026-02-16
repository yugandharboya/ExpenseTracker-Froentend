import "./index.css";
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
  } = useContext(HrmsContext);

  return (
    <div className="filters-container">
      <h1 className="filter-title">Filters & Search</h1>
      <div className="filter-row-container">
        <input
          type="search"
          placeholder="Search Transactions"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
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
      </div>
    </div>
  );
};

export default Filters;
