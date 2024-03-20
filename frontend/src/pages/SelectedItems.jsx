import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

import { List } from "@mui/material";

import ListItems from "./ListItems";
import ItemSearchBar from "../components/ItemSearchBar";
import styles from "./styles/SelectedItems.module.css";

const SelectedItems = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const { state } = useLocation();

  const ROOT = "localhost:8000";

  const fetchListItems = (data) => {
    fetch(ROOT + "/api/list-items/list", {
      method: "POST",
      body: JSON.stringify({
        id: data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      setSelectedItems(resp);
    });
  };

  useEffect(() => {
    // const items_id = state.items_id;
    // if (typeof items_id !== "undefined" && items_id !== null) {
    //   fetchListItems(items_id);
    // }
  }, [state]);

  const listProperty = (property, newValue) => {
    setSelectedItems((listItem) => ({
      ...listItem,
      [property]: newValue,
    }));
  };

  const setListItems = useCallback((data) => {
    listProperty("items", data);
  }, []);

  const addItemToList = useCallback((data) => {
    const method = state.id ? "PUT" : "POST";
    const url = state.id ? "/api/list-item/edit" : "/api/list-items/create";
    let body = {
      item: data,
    };

    if (state.id) {
      body.id = state.id;
    }

    fetch(ROOT + url, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  return (
    <div>
      <div className={styles.container_search_bar}>
        <ItemSearchBar callbackFormValues={(data) => addItemToList(data)} />
      </div>
      {selectedItems.length > 0 && (
        <div className={styles.container_list}>
          <List>
            <ListItems list={selectedItems} />
          </List>
        </div>
      )}
    </div>
  );
};

export default SelectedItems;
