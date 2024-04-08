import { createContext, useState } from "react";

export const TmpItemContext = createContext();

export const TmpItemProvider = ({ children }) => {
  const DEFAULT_ITEM_INFO = {
    name: null,
    qty: 1,
    price: null,
    unit: "kg",
  };

  const [tmpItemInfo, setTmpItemInfo] = useState(DEFAULT_ITEM_INFO);

  const cleanTmpItemInfo = () => {
    setTmpItemInfo(DEFAULT_ITEM_INFO);
  };

  return (
    <TmpItemContext.Provider
      value={{ tmpItemInfo, setTmpItemInfo, cleanTmpItemInfo }}
    >
      {children}
    </TmpItemContext.Provider>
  );
};
