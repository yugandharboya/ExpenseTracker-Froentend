import "./index.css";
import failureView from "../../assets/failure-view.png";

const ErrorView = () => {
  return (
    <div className="error-view-container">
      <img
        src={failureView}
        alt="failure view image"
        className="error-view-image"
      />
      <h1 className="error-view-heading">❌ Oops! Something went wrong.</h1>
      <p className="error-view-message">please try again later.</p>
    </div>
  );
};

export default ErrorView;
