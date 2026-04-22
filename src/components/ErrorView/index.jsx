import "./index.css";

const ErrorView = () => {
  return (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="Error"
        className="error-view-image"
      />
      <h1 className="error-view-heading">❌ Oops! Something went wrong.</h1>
      <p className="error-view-message">please try again later.</p>
    </div>
  );
};

export default ErrorView;
