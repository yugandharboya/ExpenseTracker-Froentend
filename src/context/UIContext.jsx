import { createContext, useState } from "react";

export const UIContext = createContext();
export const UIContextProvider = ({ children }) => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [editTransaction, setEditTransaction] = useState(false);

  return (
    <UIContext.Provider
      value={{
        showTransactionForm,
        setShowTransactionForm,
        editTransaction,
        setEditTransaction,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
