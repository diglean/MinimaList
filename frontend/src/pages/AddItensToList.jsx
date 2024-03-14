import styles from "./styles/AddItensToList.module.css";
import ItemSearchBar from "../components/ItemSearchBar";
import { useLocation } from "react-router-dom";
import { useCallback } from "react";
import { useState } from "react";

export default function AddItensToList() {
  const [listData, setListData] = useState({});
  const { state } = useLocation();

  const ROOT = "localhost:8000";

  const listProperty = (property, newValue) => {
    setListData((listItem) => ({
      ...listItem,
      [property]: newValue,
    }));
  };

  const createNewList = useCallback((data) => {
    fetch("http://localhost:5000/lists", {
      method: state.id ? "PUT" : "POST",
      body: JSON.stringify(listData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  const setListItems = useCallback((data) => {
    listProperty("items", data);
  });

  const addItensToList = useCallback((data) => {
    fetch(ROOT + "/api/lists-itens/create", {
      method: "POST",
      body: JSON.stringify(data[0]),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  return (
    <div className={styles.container}>
      <ItemSearchBar callbackFormValues={(data) => addItensToList(data)} />
    </div>
  );
}
