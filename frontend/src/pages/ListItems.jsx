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
import useTranslation from "../components/customHooks/translation";

const ListItems = ({ list, cbDeleteItem }) => {
  const translation = useTranslation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteItemModal, setOpenDeleteItemModal] = useState(false);
  const CURRENCY = "R$";

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
      {list.map(({ id, name, qty, unit, price, category_id }, index) => (
        <div key={index + name}>
          <GenericModal
            open={openDeleteItemModal}
            primaryText={translation.are_you_sure}
            secondaryText={translation.irreversable_action}
            primaryButtonProps={{
              variant: "contained",
              text: translation.yes,
              onClick: () => {
                cbDeleteItem(selectedItem);
                setOpenDeleteItemModal(false);
              },
            }}
            secondaryButtonProps={{
              variant: "text",
              text: translation.no,
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
                  setTmpEditItemInfo({
                    id: id,
                    name: name,
                    qty: qty,
                    unit: unit,
                    price: price,
                    category_id: category_id,
                  });
                  setOpenModal(true);
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
