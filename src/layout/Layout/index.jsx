import "./index.css";
import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <div className="page-layout">
      <Header />
      <div className="main-layout">{children}</div>
    </div>
  );
};

export default Layout;
