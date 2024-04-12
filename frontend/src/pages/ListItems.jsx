import {
  Divider,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import styles from "./styles/ListItems.module.css";
import ListItemInfoGenericModal from "../components/modals/ListItemInfoGenericModal";
import { useState, useContext } from "react";
import { TmpItemContext } from "../context/TmpItemContext";
import Button from "../components/Button";
import { FaRegTrashCan } from "react-icons/fa6";
import GenericModal from "../components/modals/GenericModal";

const ListItems = ({ list, cbDeleteItem }) => {
  const [selectedListItem, setSelectedItem] = useState(null);
  const { tmpItemInfo, setTmpItemInfo } = useContext(TmpItemContext);
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
            data={selectedListItem}
            open={openDeleteItemModal}
            primaryText="Are you sure?"
            secondaryText="That's a irreversable action!"
            primaryButtonProps={{
              variant: "contained",
              text: "Yes",
              onClick: (e, data) => {
                cbDeleteItem(data);
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
                  setSelectedItem(index);
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
