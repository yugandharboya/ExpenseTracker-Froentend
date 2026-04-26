import "./index.css";
import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main-layout">{children}</main>
    </>
  );
};

export default Layout;
