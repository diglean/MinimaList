import { useState, forwardRef } from "react";
import { NumericFormat } from "react-number-format";

import {
  Box,
  Fade,
  Grid,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";

import Form from "../Form";
import Button from "../Button";
import TemporaryDrawer from "../Drawer";
import Input from "../Input";
import { Fragment } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

const style = {
  position: "absolute",
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

export default function ListItemInfoModal({
  open,
  itemData,
  callBackFormValues,
}) {
  useEffect(
    (itemData) => {
      if (typeof itemData !== "undefined") {
        setItemInfo(itemData);
      }
    },
    [itemData]
  );

  const [drawerState, setDrawerState] = useState(false);
  const [itemInfo, setItemInfo] = useState({
    price: null,
    unit: "kg",
  });

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
      console.log("Não tem preço");
      return;
    }
  });

  const cbToggleDrawer = (drawerState, data = null) => {
    if (data !== null) {
      updateUnit(data);
    }

    setDrawerState(drawerState);
  };

  // Use useEffect to react to changes in itemInfo
  useEffect(() => {
    // Ensure itemInfo has the data you expect before calling callBackFormValues
    if (itemInfo.price !== null) {
      callBackFormValues(itemInfo);
    }
  }, [itemInfo]); // This effect depends on itemInfo, so it runs whenever itemInfo changes

  return (
    <div>
      <TemporaryDrawer
        drawerState={drawerState}
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
                      onClick={() => callBackFormValues(false)}
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
    </div>
  );
}
