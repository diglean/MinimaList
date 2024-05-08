import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";

import { toast, ToastContainer } from "react-toastify";

import { List } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";

import NoListRegistered from "./NoListRegistered";

import Loading from "../components/Loading";
import AppBar from "../components/LogoBar";
import BottomNavigation from "../components/BottomNavigation";
import ListInfoModal from "../components/ListInfoModal";
import FloatingAddListButton from "../components/FloatingAddListButton";
import GenericModal from "../components/modals/GenericModal";
import Button from "../components/Button";

import { formatDatetime } from "../library/FormatData";
import styles from "./styles/Lists.module.css";

const ROOT = "http://localhost:8000";

export default function Lists() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(ROOT + "/api/list/list", {
      method: "POST",
      body: JSON.stringify({
        customer_id: 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setLists(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

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
    fetch(ROOT + "/api/list/remove", {
      method: "POST",
      body: JSON.stringify({
        list_id: data,
        user_id: 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setLists(data.lists);
        setLoading(false);
        ToastSuccess("List deleted!");
      });
  }, []);

  if (lists !== false) {
    return (
      <div>
        <AppBar />
        <ToastContainer />
        <Loading open={loading} />
        <ListInfoModal open={open} cbCloseModal={() => setOpen(false)} />
        {lists.length > 0 ? (
          <>
            <FloatingAddListButton
              cbOnClick={() => setOpen(true)}
              open={open === false}
            />
            <List>
              <div className={styles.list_container}>
                {lists.map(
                  ({ id, name, created_at, items_qty, items_id }, index) => (
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
                  )
                )}
              </div>
            </List>
          </>
        ) : (
          <NoListRegistered cbOpenModal={() => setOpen(true)} />
        )}
        <BottomNavigation />
      </div>
    );
  } else {
    return (
      <div>
        <AppBar />
        <Loading open={loading} />
        <BottomNavigation />
      </div>
    );
  }
}
