import { useEffect, useContext, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

import { Divider, List, ListItemButton, ListItemText } from "@mui/material";

import ListItemInfoGenericModal from "../components/modals/ListItemInfoGenericModal";
import Button from "../components/Button";
import GenericModal from "../components/modals/GenericModal";
import useTranslation from "../components/customHooks/translation";
import { TmpItemContext } from "../context/TmpItemContext";

import styles from "./styles/ListItems.module.css";

const ListListItems = ({ list, cbDeleteItem, cbEditItemData }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteItemModal, setOpenDeleteItemModal] = useState(false);
  const CURRENCY = "R$";

  const { editItemInfo, setEditItemInfo, cleanEditItemInfo } =
    useContext(TmpItemContext);

  const translation = useTranslation();

  const handleCbFormValues = (data) => {
    if (data === false) {
      cleanEditItemInfo();
      setOpenModal(false);
      return;
    }

    cbEditItemData(data);
  };

  useEffect(() => {
    if (editItemInfo.name === null || editItemInfo.name === "") {
      return;
    }

    setOpenModal(true);
  });

  return (
    <>
      <ListItemInfoGenericModal
        open={openModal}
        cbFormValues={(data) => handleCbFormValues(data)}
        action="edit"
      />
      <List>
        {list.map(
          ({ id, list_id, name, qty, unit, price, category_id }, index) => (
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
                    primary={name + " · " + qty}
                    secondary={
                      <>
                        {price
                          ? CURRENCY + " " + price + " / " + unit
                          : "No info"}
                      </>
                    }
                    onClick={() => {
                      setEditItemInfo({
                        id: id,
                        list_id: list_id,
                        name: name,
                        qty: qty,
                        price: price,
                        unit: unit,
                        category_id: category_id,
                      });
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
          )
        )}
      </List>
    </>
  );
};

export default ListListItems;
