import "./index.css";
import { useContext } from "react";
import HrmsContext from "../../context";

const CategoryCard = () => {
  const { categoryList } = useContext(HrmsContext);

  return (
    <div className="category-cards-container">
      {categoryList.map((each) => (
        <div className="category-card" key={each.category}>
          <h3 className="category-name">{each.category}</h3>
          <p className="category-total">₹ {each.total}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryCard;
