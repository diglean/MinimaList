import { useState, useEffect, useCallback, useContext } from "react";
import { useLocation } from "react-router-dom";

import { List } from "@mui/material";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ListListItems from "./ListListItems";
import ItemSearchBar from "../components/ItemSearchBar";
import Loading from "../components/Loading";
import AppBar from "../components/LogoBar";
import { TmpItemContext } from "../context/TmpItemContext";

import styles from "./styles/SelectedItems.module.css";
import ListItemInfoGenericModal from "../components/modals/ListItemInfoGenericModal";
import TotalPaying from "../components/TotalPaying";
import DisplayTmpItem from "../components/DisplayTmpItem";
import ButtonsTmpItem from "../components/ButtonsTmpItem";

const ROOT = "http://localhost:8000";

const SelectedItems = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalList, setTotalList] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [listItemsId, setListItemsId] = useState(null);

  const { state } = useLocation();

  const { tmpItemInfo, setTmpItemInfo, cleanTmpItemInfo, cleanEditItemInfo } =
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

  const formatPrice = (selectedItems) => {
    selectedItems.map(({ price }, index) => {
      selectedItems[index] = price.replace(/\D/g, "");
      selectedItems[index] = price.replace(/(\d)(\d{2})$/, "$1,$2");
      selectedItems[index] = price.replace(/(?=(\d{3})+(\D))\B/g, ".");
    });
  };

  useEffect(() => {
    const list_id = state?.list_id;

    if (typeof list_id !== "undefined" && list_id !== null) {
      setLoading(true);

      fetch(ROOT + "/api/list-item/list", {
        method: "POST",
        body: JSON.stringify({
          list_id: list_id,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          formatPrice(data.items);
          setSelectedItems(data.items);
          setTotalList(data.items_total);
          setLoading(false);
        })
        .catch((err) => {
          setSelectedItems([
            {
              id: 0,
              name: "Alface",
              price: "150,37",
              quantity: 1,
              unit: "Kg",
              list_id: 0,
            },
          ]);
          setLoading(false);
        });
    }
  }, [state]);

  const addItemToList = (data) => {
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
      .then((data) => {
        formatPrice(data.items);
        setSelectedItems(data.items);

        if (typeof data?.id !== "undefined") {
          setListItemsId(data.id);
        }

        cleanTmpItemInfo();
        setSelectedItems(data.items);
        setTotalList(data.items_total[0]);
        setModalOpen(false);
        setLoading(false);
        ToastSuccess("Item added!");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const deleteItem = (data) => {
    setLoading(true);

    fetch(ROOT + "/api/list-item/remove", {
      method: "POST",
      body: JSON.stringify({
        list_item_id: data,
        list_id: state.list_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json)
      .then(() => {
        formatPrice(selectedItems);
        setLoading(false);
      });
  };

  const cbEditItemData = (data) => {
    setLoading(true);

    const list_id = state?.list_id;

    fetch(ROOT + "/api/list-item/edit", {
      method: "PUT",
      body: JSON.stringify({
        list_id,
        ...data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        cleanEditItemInfo();
        setSelectedItems(data.items);
        setTotalList(data.items_total[0].items_total);
        setLoading(false);
      });
  };

  return (
    <div>
      <AppBar goBack="/lists" />
      <div className={styles.top_components}>
        <ListItemInfoGenericModal
          open={modalOpen}
          cbFormValues={(data) => addItemToList(data)}
          action="create"
        />
        <ToastContainer />
        <Loading open={loading} />
        <div className={styles.container_search_bar}>
          <ItemSearchBar />
        </div>
      </div>
      {tmpItemInfo.name && (
        <div className={styles.container_tmp_item} key={Math.random()}>
          <DisplayTmpItem toggleModal={(data) => setModalOpen(data)} />
          <ButtonsTmpItem cbAddItemToList={() => addItemToList()} />
        </div>
      )}
      {typeof selectedItems !== "undefined" && selectedItems.length > 0 && (
        <div
          className={
            tmpItemInfo.name ? styles.container_list_b : styles.container_list_a
          }
        >
          <ListListItems
            list={selectedItems}
            key={Math.random()}
            cbDeleteItem={(data) => deleteItem(data)}
            cbEditItemData={(data) => cbEditItemData(data)}
          />
        </div>
      )}
      <div className={styles.container_total}>
        {totalList && <TotalPaying value={totalList} />}
      </div>
    </div>
  );
};

export default SelectedItems;
