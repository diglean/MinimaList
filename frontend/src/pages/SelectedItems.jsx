import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

import { List } from "@mui/material";

import ListItems from "./ListItems";
import ItemSearchBar from "../components/ItemSearchBar";
import styles from "./styles/SelectedItems.module.css";

const SelectedItems = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const { state } = useLocation();

  const ROOT = "http://localhost:8000";

  const fetchListItems = (data) => {
    fetch(ROOT + "/api/list-items/list", {
      method: "POST",
      body: JSON.stringify({
        id: data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setListItems(data.items);
      });
    setSelectedItems();
  };

  useEffect(() => {
    const items_id = state.items_id;
    if (typeof items_id !== "undefined" && items_id !== null) {
      fetchListItems(items_id);
    }
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

  async function fetchItems() {
    await fetch;
  }

  const addItemToList = useCallback(
    (data) => {
      fetch(ROOT + "/api/list-items/create", {
        method: "POST",
        body: JSON.stringify({
          list_id: state.list_id,
          items: [data],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .catch((err) => console.log(err))
        .then((data) => {
          console.log(data);
        });
    },
    [state]
  );

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
