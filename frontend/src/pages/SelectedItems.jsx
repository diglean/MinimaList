import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

import { List } from "@mui/material";

import ListItems from "./ListItems";
import ItemSearchBar from "../components/ItemSearchBar";
import styles from "./styles/SelectedItems.module.css";
import Loading from "../components/Loading";

const ROOT = "http://localhost:8000";

const SelectedItems = () => {
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [listItemsId, setListItemsId] = useState(null);

  const { state } = useLocation();

  const listProperty = (property, newValue) => {
    setSelectedItems((listItem) => ({
      ...listItem,
      [property]: newValue,
    }));
  };

  function fetchListItems(data) {
    fetch(ROOT + "/api/list-items/list", {
      method: "POST",
      body: JSON.stringify({
        id: data,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("waited 3 seconds");
        setLoading(false);
        setSelectedItems(data.items);
      });
  }

  useEffect(() => {
    const items_id = state?.items_id;

    if (typeof items_id !== "undefined" && items_id !== null) {
      setLoading(true);
      setListItemsId(items_id);
      fetchListItems(items_id);
    }
  }, [state, fetchListItems]);

  const addItemToList = useCallback(
    (data) => {
      let method = "POST";
      let action = "create";

      if (listItemsId !== null) {
        method = "PUT";
        action = "edit";
      }

      fetch(ROOT + "/api/list-items/" + action, {
        method,
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
    [state, listItemsId]
  );

  return (
    <div>
      <Loading open={loading} />
      <div className={styles.container_search_bar}>
        <ItemSearchBar
          callbackFormValues={(data) => {
            addItemToList(data);
          }}
        />
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
