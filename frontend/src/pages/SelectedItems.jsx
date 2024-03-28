import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

import { List } from "@mui/material";

import ListItems from "./ListItems";
import ItemSearchBar from "../components/ItemSearchBar";
import styles from "./styles/SelectedItems.module.css";
import Loading from "../components/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ROOT = "http://localhost:8000";

const SelectedItems = () => {
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([
    //   {
    //   id: 1,
    //   name: 'Lorem',
    //   unit: 'kg',
    //   price: '10',
    // }
  ]);
  const [listItemsId, setListItemsId] = useState(null);

  const { state } = useLocation();

  const listProperty = (property, newValue) => {
    setSelectedItems((listItem) => ({
      ...listItem,
      [property]: newValue,
    }));
  };

  const Toast = (message) => {
    toast.success(message, {
      position: "bottom-center",
      theme: "dark",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
    });
  };

  useEffect(() => {
    const items_id = state?.items_id;

    if (typeof items_id !== "undefined" && items_id !== null) {
      setListItemsId(items_id);
      setLoading(true);

      fetch(ROOT + "/api/list-items/list", {
        method: "POST",
        body: JSON.stringify({
          id: items_id,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setSelectedItems(data.items);
          setLoading(false);
        });
    }
  }, [state]);

  const addItemToList = useCallback(
    (data) => {
      let method = "POST";
      let action = "create";

      if (listItemsId !== null) {
        method = "PUT";
        action = "edit";
      }

      setLoading(true);

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
          setSelectedItems(data.items);

          if (typeof data?.id !== "undefined") {
            setListItemsId(data.id);
          }
          setLoading(false);
          Toast("Item added!");
        });
    },
    [state, listItemsId, setSelectedItems]
  );

  return (
    <div>
      <ToastContainer />
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
