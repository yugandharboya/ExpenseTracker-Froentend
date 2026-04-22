import "./index.css";
import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="main-layout">{children}</div>
    </>
  );
};

export default Layout;
