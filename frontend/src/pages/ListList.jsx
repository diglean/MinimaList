import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";

import GenericModal from "../components/modals/GenericModal";
import AppBar from "../components/LogoBar";
import BottomNavigation from "../components/BottomNavigation";
import Button from "../components/Button";
import Loading from "../components/Loading";

import { formatDatetime } from "../library/FormatData";

import styles from "./styles/ListLists.module.css";
import { useEffect } from "react";

export default function ListList({ list }) {
  const ROOT = "http://localhost:8000";

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const ToastSuccess = (message) => {
    toast.success(message, {
      position: "bottom-center",
      theme: "dark",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
    });
  };

  const handleClick = (data) => {
    navigate("/selected-items", {
      state: { items_id: data.items_id, list_id: data.list_id },
    });
  };

  const deleteList = useCallback((data) => {
    setLoading(true);
    fetch(ROOT + "/api/list/delete", {
      method: "POST",
      body: JSON.stringify({
        list_id: data,
        user_id: 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        ToastSuccess("List deleted!");
      });
  }, []);

  return (
    <>
      <AppBar />
      <ToastContainer />
      <Loading open={loading} />
      <div className={styles.list_container}>
        {list.map(({ id, name, created_at, items_qty, items_id }, index) => (
          <div key={index + name}>
            <GenericModal
              open={modalOpen}
              primaryText="Are you sure?"
              secondaryText="That's a irreversable action!"
              primaryButtonProps={{
                variant: "contained",
                text: "Yes",
                onClick: () => {
                  deleteList(selectedItem);
                  setSelectedItem(null);
                  setModalOpen(false);
                },
              }}
              secondaryButtonProps={{
                variant: "text",
                text: "No",
                onClick: () => {
                  setModalOpen(false);
                },
              }}
            />
            <div className={styles.container}>
              <ListItemButton disableRipple>
                <ListItemText
                  primary={name}
                  secondary={
                    <>
                      <Typography component="span">
                        {items_qty} Itens
                      </Typography>
                      <br />
                      <Typography component="span">
                        {formatDatetime(created_at, "DD/MM/YYYY")}
                      </Typography>
                    </>
                  }
                  onClick={() =>
                    handleClick({ list_id: id, items_id: items_id })
                  }
                />
                <Button
                  onClick={() => {
                    setModalOpen(true);
                    setSelectedItem(id);
                  }}
                >
                  <FaRegTrashCan />
                </Button>
              </ListItemButton>
              <Divider variant="middle" component="li" />
            </div>
          </div>
        ))}
      </div>
      <BottomNavigation />
    </>
  );
}
