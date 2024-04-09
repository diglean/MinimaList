import { useState, useEffect, useCallback, useContext } from "react";
import { useLocation } from "react-router-dom";

import {
  List,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ListItems from "./ListItems";
import ItemSearchBar from "../components/ItemSearchBar";
import Loading from "../components/Loading";
import AppBar from "../components/LogoBar";
import { TmpItemContext } from "../context/TmpItemContext";

import styles from "./styles/SelectedItems.module.css";
import ListItemInfoGenericModal from "../components/modals/ListItemInfoGenericModal";
import NumberInput from "../components/NumberInput";
import Button from "../components/Button";

const ROOT = "http://localhost:8000";

const SelectedItems = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([
    {
      name: "Lorem",
      unit: "kg",
      price: 10.5,
      qty: 1,
    },
  ]);
  const [listItemsId, setListItemsId] = useState(null);

  const { state } = useLocation();
  const { tmpItemInfo, setTmpItemInfo, cleanTmpItemInfo } =
    useContext(TmpItemContext);

  const listProperty = (property, newValue) => {
    setSelectedItems((listItem) => ({
      ...listItem,
      [property]: newValue,
    }));
  };

  const ToastSuccess = (message) => {
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
      let body = {
        list_id: state.list_id,
        items: [data],
      };

      if (listItemsId !== null) {
        method = "PUT";
        action = "edit";
        body.id = state.items_id;
      }

      setLoading(true);

      fetch(ROOT + "/api/list-items/" + action, {
        method,
        body: JSON.stringify(body),
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
          ToastSuccess("Item added!");
        });
    },
    [state, listItemsId, setSelectedItems]
  );

  const itemProperty = (property, newValue) => {
    setTmpItemInfo((tmpItemInfo) => ({
      ...tmpItemInfo,
      [property]: newValue,
    }));
  };

  const setTmpItemDetails = (data) => {
    if (data !== false) {
      setTmpItemInfo(data);
    }

    setModalOpen(false);
  };

  return (
    <div>
      <AppBar goBack="/lists" />
      <ListItemInfoGenericModal
        open={modalOpen}
        cbFormValues={(data) => setTmpItemDetails(data)}
      />
      <ToastContainer />
      <Loading open={loading} />
      <div className={styles.container_search_bar}>
        <ItemSearchBar />
      </div>
      {tmpItemInfo.name && (
        <>
          <div className={styles.container_tmp_item} key={Math.random()}>
            <ListItem className={styles.list_item_container}>
              <ListItemButton disableRipple onClick={() => setModalOpen(true)}>
                <div className={styles.tmp_item_text}>
                  <ListItemText
                    primary={tmpItemInfo.name}
                    secondary={
                      tmpItemInfo.price
                        ? "R$ " + tmpItemInfo.price + " / " + tmpItemInfo.unit
                        : ""
                    }
                  />
                </div>
              </ListItemButton>
              <NumberInput
                inputValue={tmpItemInfo.qty}
                cbHandleChange={(data) => {
                  if (data === 0) {
                    cleanTmpItemInfo();
                    return;
                  }

                  itemProperty("qty", data);
                }}
              />
            </ListItem>
            <Grid
              container
              display="flex"
              alignItems="center"
              justifyContent="center"
              spacing={2}
              className={styles.button_container}
            >
              <Grid item>
                <Button
                  onClick={() => cleanTmpItemInfo()}
                  variant="outlined"
                  text="Cancel"
                />
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    cleanTmpItemInfo();
                    addItemToList(tmpItemInfo);
                  }}
                  variant="contained"
                  text="Confirm"
                />
              </Grid>
            </Grid>
          </div>
        </>
      )}
      {typeof selectedItems !== "undefined" && selectedItems.length > 0 && (
        <div
          className={
            tmpItemInfo.name ? styles.container_list_b : styles.container_list_a
          }
        >
          <List>
            <ListItems list={selectedItems} key={Math.random()} />
          </List>
        </div>
      )}
    </div>
  );
};

export default SelectedItems;
