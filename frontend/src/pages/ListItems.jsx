import {
  Divider,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import styles from "./styles/ListItems.module.css";
import ListItemInfoGenericModal from "../components/modals/ListItemInfoGenericModal";
import { useState } from "react";
import Button from "../components/Button";
import { FaRegTrashCan } from "react-icons/fa6";
import GenericModal from "../components/modals/GenericModal";

const ListItems = ({ list, cbDeleteItem }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteItemModal, setOpenDeleteItemModal] = useState(false);
  const CURRENCY = "R$";

  const handleOpenModal = (data) => {
    setOpenModal(true);
  };

  const handleCbFormValues = (data) => {
    if (data === false) {
      setOpenModal(false);
    }
  };

  return (
    <>
      <ListItemInfoGenericModal
        open={openModal}
        cbFormValues={(data) => handleCbFormValues(data)}
      />
      {list.map(({ id, name, unit, price }, index) => (
        <div key={index + name}>
          <GenericModal
            open={openDeleteItemModal}
            primaryText="Are you sure?"
            secondaryText="That's a irreversable action!"
            primaryButtonProps={{
              variant: "contained",
              text: "Yes",
              onClick: () => {
                cbDeleteItem(selectedItem);
                setOpenDeleteItemModal(false);
              },
            }}
            secondaryButtonProps={{
              variant: "text",
              text: "No",
              onClick: () => {
                setOpenDeleteItemModal(false);
              },
            }}
          />
          <div className={styles.container}>
            <ListItemButton disableRipple key={index + name}>
              <ListItemText
                primary={name}
                secondary={
                  <>
                    {price && (
                      <Typography component="span">
                        {CURRENCY + " " + (price != null ? price : "0,00")} /{" "}
                        {unit}
                      </Typography>
                    )}
                    {!price && (
                      <Typography component="span">No Info</Typography>
                    )}
                  </>
                }
                onClick={() => handleOpenModal(true)}
                key={index + name}
              />
              <Button
                onClick={() => {
                  setOpenDeleteItemModal(true);
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
    </>
  );
};

export default ListItems;
