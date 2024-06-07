import { createContext, useState } from "react";

export const TmpItemContext = createContext();

export const TmpItemProvider = ({ children }) => {
  const DEFAULT_ITEM_INFO = {
    name: "",
    qty: 1,
    price: "",
    unit: "Kg",
    category_id: 1,
  };

  const [tmpItemInfo, setTmpItemInfo] = useState(DEFAULT_ITEM_INFO);
  const [editItemInfo, setEditItemInfo] = useState(DEFAULT_ITEM_INFO);

  const cleanTmpItemInfo = () => {
    setTmpItemInfo(DEFAULT_ITEM_INFO);
  };

  const cleanEditItemInfo = () => {
    setEditItemInfo(DEFAULT_ITEM_INFO);
  };

  return (
    <TmpItemContext.Provider
      value={{
        tmpItemInfo,
        editItemInfo,
        setTmpItemInfo,
        setEditItemInfo,
        cleanTmpItemInfo,
        cleanEditItemInfo,
      }}
    >
      {children}
    </TmpItemContext.Provider>
  );
};
