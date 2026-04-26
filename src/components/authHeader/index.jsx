import "./index.css";
import { DollarSign } from "lucide-react";

const AuthHeader = () => (
  <div className="login-header">
    <div className="logo-box">
      <DollarSign size={20} color="white" />
    </div>
    <h1>ExpenseFlow</h1>
    <p>Track your finances with clarity</p>
  </div>
);

export default AuthHeader;
