import "./index.css";

const TransactionCard = ({ item }) => {
  const { title, amount, category, date } = item;

  return (
    <div className="transaction-card">
      <div className="transaction-info">
        <div className="transaction-top">
          <span className="transaction-category">{category}</span>
          <h4 className="transaction-title">{title}</h4>
        </div>
        <p className="transaction-date">{date}</p>
      </div>

      <p className="transaction-amount">₹{amount}</p>
    </div>
  );
};

export default TransactionCard;
