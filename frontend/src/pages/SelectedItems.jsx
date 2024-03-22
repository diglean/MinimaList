import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

import { List } from "@mui/material";

import ListItems from "./ListItems";
import ItemSearchBar from "../components/ItemSearchBar";
import styles from "./styles/SelectedItems.module.css";
import Loading from "../components/Loading";

const ROOT = "http://localhost:8000";

const SelectedItems = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const { state } = useLocation();

  const listProperty = (property, newValue) => {
    setSelectedItems((listItem) => ({
      ...listItem,
      [property]: newValue,
    }));
  };

  const setListItems = useCallback((data) => {
    listProperty("items", data);
  }, []);

  const fetchListItems = useCallback((data) => {
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
  }, [setListItems]);

  useEffect(() => {
    const items_id = state?.items_id;

    if (typeof items_id !== "undefined" && items_id !== null) {
      fetchListItems(items_id);
    }
  }, [state, fetchListItems]);

  const addItemToList = useCallback(
    (data) => {
      setLoading(true);
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
          setLoading(false);
        });
    },
    [state]
  );

  return (
    <div>
      <Loading open={loading}/>
      <div className={styles.container_search_bar}>
        <ItemSearchBar callbackFormValues={(data) => {addItemToList(data)}} />
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
