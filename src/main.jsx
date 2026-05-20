import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UIContextProvider } from "./context/UIContext.jsx";
import { DashboardContextProvider } from "./context/DashboardContext";
import { TransactionContextProvider } from "./context/TransactionContext";
import { FilterContextProvider } from "./context/FilterContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UIContextProvider>
        <FilterContextProvider>
          <TransactionContextProvider>
            <DashboardContextProvider>
              <App />
            </DashboardContextProvider>
          </TransactionContextProvider>
        </FilterContextProvider>
      </UIContextProvider>
    </BrowserRouter>
    ,
  </StrictMode>,
);
