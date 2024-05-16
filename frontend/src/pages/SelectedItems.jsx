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
import TotalPaying from "../components/TotalPaying";

const ROOT = "http://localhost:8000";

const SelectedItems = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalList, setTotalList] = useState(0);
  const [selectedItems, setSelectedItems] = useState([
    {
      id: 0,
      name: "Alface",
      price: "150,37",
      quantity: 1,
      unit: "Kg",
      list_id: 0,
    }
  ]);
  const [listItemsId, setListItemsId] = useState(null);

  const { state } = useLocation();
  const { tmpItemInfo, setTmpItemInfo, cleanTmpItemInfo } =
    useContext(TmpItemContext);

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
    const list_id = state?.list_id;

    if (typeof list_id !== "undefined" && list_id !== null) {
      setLoading(true);

      // fetch(ROOT + "/api/list-item/list", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     list_id: list_id,
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Origin": "*",
      //   },
      // })
      //   .then((resp) => resp.json())
      //   .then((data) => {
      //     setSelectedItems(data.items);
      //     setTotalList(data.items_total);
      //     setLoading(false);
      //   });
    }
  }, [state]);

  const addItemToList = useCallback(
    (data) => {
      if (data === false) {
        setModalOpen(false);
        return;
      }

      setLoading(true);

      fetch(ROOT + "/api/list-item/create", {
        method: "POST",
        body: JSON.stringify({
          list_id: state.list_id,
          ...tmpItemInfo,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .catch((err) => {
          console.log(err);
          setLoading(false);
        })
        .then((data) => {
          setSelectedItems(data.items);

          if (typeof data?.id !== "undefined") {
            setListItemsId(data.id);
          }
          cleanTmpItemInfo();
          setSelectedItems(data.items);
          setTotalList(data.items_total);
          setModalOpen(false);
          setLoading(false);
          ToastSuccess("Item added!");
        });
    },
    [state, tmpItemInfo, listItemsId, cleanTmpItemInfo]
  );

  const itemProperty = (property, newValue) => {
    setTmpItemInfo((tmpItemInfo) => ({
      ...tmpItemInfo,
      [property]: newValue,
    }));
  };

  const deleteItem = useCallback(
    (data) => {
      let newListItem = selectedItems;

      newListItem = selectedItems.splice(data, 1);

      fetch(ROOT + "/api/list-item/remove", {
        method: "POST",
        body: JSON.stringify({
          list_items: newListItem,
          list_id: state.list_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    [selectedItems, state]
  );

  return (
    <div>
      <div className={styles.top_components}>
        <AppBar goBack="/lists" />
        <ListItemInfoGenericModal
          open={modalOpen}
          cbFormValues={(data) => addItemToList(data)}
        />
        <ToastContainer />
        <Loading open={loading} />
        <div className={styles.container_search_bar}>
          <ItemSearchBar />
        </div>
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
                  onClick={() => addItemToList()}
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
            <ListItems
              list={selectedItems}
              key={Math.random()}
              cbDeleteItem={(data) => deleteItem(data)}
            />
          </List>
        </div>
      )}
      <div className={styles.container_total}>
        {totalList && <TotalPaying value={totalList} />}
      </div>
    </div>
  );
};

export default SelectedItems;
