import { useState } from "react";

import {
  Box,
  Fade,
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";

import Form from "../Form";
import Button from "../Button";
import TemporaryDrawer from "../Drawer";
import Input from "../FormInput";
import { Fragment } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

import styles from "./styles/ListItemInfoModal.module.css";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.black",
  border: "1px solid",
  p: 2,
  color: "#FFF",
  width: "70%",
  borderRadius: "10px",
};

const CustomModal = ({ open, item, callbackFormValues }) => {
  const [drawerState, setDrawerState] = useState(false);
  const [itemInfo, setItemInfo] = useState({
    name: null,
    price: null,
    unit: "kg",
  });

  useEffect(() => {
    if (typeof item !== "undefined" && item.name !== null) {
      setItemInfo(item);
    }
  }, [item]);

  useEffect(() => {
    if (itemInfo.price !== null) {
      callbackFormValues(itemInfo);
    }
  }, [itemInfo, callbackFormValues]);

  const updatePrice = (newPrice) => {
    setItemInfo((itemInfo) => ({
      ...itemInfo,
      price: newPrice,
    }));
  };

  const updateUnit = (newUnit) => {
    setItemInfo((itemInfo) => ({
      ...itemInfo,
      unit: newUnit,
    }));
  };

  const handleSubmit = useCallback((data) => {
    if (data.itemPrice.trim() !== "") {
      updatePrice(data.itemPrice.trim());
    } else {
      return;
    }
  }, []);

  const cbToggleDrawer = (drawerState, data = null) => {
    if (data !== null) {
      updateUnit(data);
    }

    setDrawerState(drawerState);
  };

  return (
    <>
      <TemporaryDrawer
        open={drawerState}
        cbToggleDrawer={(drawerState, data) =>
          cbToggleDrawer(drawerState, data)
        }
      />
      <Box>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ paddingBottom: "8px" }}
              >
                Item info
              </Typography>
              <Form callBackSubmit={(data) => handleSubmit(data)}>
                <Input
                  label="Price"
                  name="itemPrice"
                  variant="outlined"
                  value={itemInfo.price ?? null}
                  InputProps={{
                    startAdornment: (
                      <Fragment>
                        <Typography sx={{ color: "#FFF" }}>R$&nbsp;</Typography>
                      </Fragment>
                    ),
                    endAdornment: (
                      <Fragment>
                        <Tooltip title="Change Item Unity">
                          <IconButton
                            size="small"
                            onClick={() => cbToggleDrawer(true)}
                          >
                            <Typography sx={{ color: "#FFF" }}>
                              / {itemInfo.unit ?? "kg"}
                            </Typography>
                          </IconButton>
                        </Tooltip>
                      </Fragment>
                    ),
                  }}
                />
                <Grid container spacing="0.5" justifyContent="flex-end">
                  <Grid item>
                    <Button
                      variant="text"
                      text="Cancel"
                      onClick={() => callbackFormValues(false)}
                    />
                  </Grid>
                  <Grid item>
                    <Button variant="text" text="Ok" type="submit" />
                  </Grid>
                </Grid>
              </Form>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </>
  );
};

export default function ListItemInfoModal({
  itemData,
  callbackFormValues,
  children,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const callbackFormValuesChild = (data) => {
    if (data === false) {
      setModalOpen(false);
      return;
    }

    callbackFormValues(data);
  };

  return (
    <>
      <CustomModal
        open={modalOpen}
        item={itemData}
        callbackFormValues={(data) => callbackFormValuesChild(data)}
      />
      <ListItem className={styles.list_item_container}>
        <ListItemButton disableRipple onClick={() => setModalOpen(true)}>
          <ListItemText
            primary={itemData.name}
            secondary={
              itemData.price
                ? "R$ " + itemData.price + " / " + itemData.unit
                : ""
            }
          />
        </ListItemButton>
        {children}
      </ListItem>
    </>
  );
}
