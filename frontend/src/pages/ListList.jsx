import { useNavigate } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";

import { FaRegTrashCan } from "react-icons/fa6";

import { formatDatetime } from "../library/FormatData";
import AppBar from "../components/LogoBar";
import BottomNavigation from "../components/BottomNavigation";
import Button from "../components/Button";

import styles from "./styles/ListLists.module.css";
import GenericModal from "../components/modals/GenericModal";
import { useState, useCallback } from "react";

export default function ListList({ list }) {
  const ROOT = "https://localhost:8000";
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (data) => {
    navigate("/selected-items", {
      state: { items_id: data.list_id, list_id: data.list_id },
    });
  };

  const deleteList = useCallback((data) => {
    fetch(ROOT + "/api/list/delete", {
      method: "POST",
      body: JSON.stringify({
        id: data,
        user_id: 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //
      });
  }, []);

  return (
    <>
      <AppBar />
      {list.map(({ id, name, created_at, items_qty, items_id }, index) => (
        <div>
          <GenericModal
            open={modalOpen}
            primaryText="Are you sure?"
            secondaryText="That's a irreversable action!"
            primaryButtonProps={{
              variant: "contained",
              text: "Yes",
              onClick: () => {
                deleteList(id);
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
          <div className={styles.container} key={index + name}>
            <ListItemButton disableRipple>
              <ListItemText
                primary={name}
                secondary={
                  <>
                    <Typography component="span">{items_qty} Itens</Typography>
                    <br />
                    <Typography component="span">
                      {formatDatetime(created_at, "DD/MM/YYYY")}
                    </Typography>
                  </>
                }
                onClick={() => handleClick({ list_id: id, items_id: items_id })}
              />
              <Button onClick={() => setModalOpen(true)}>
                <FaRegTrashCan />
              </Button>
            </ListItemButton>
            <Divider variant="middle" component="li" />
          </div>
        </div>
      ))}
      <BottomNavigation />
    </>
  );
}
