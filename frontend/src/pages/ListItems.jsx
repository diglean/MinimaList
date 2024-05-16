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

  const handleOpenModal = () => {
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
        editItemData={selectedItem}
      />
      {list.map(({ id, name, unit, price, category_id }, index) => (
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
                    {price ? CURRENCY + " " + price + " / " + unit : "No info"}
                  </>
                }
                onClick={() => {
                  setSelectedItem({
                    id,
                    name,
                    unit,
                    price,
                    category_id,
                  });
                  handleOpenModal(true);
                }}
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
