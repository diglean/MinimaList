import { Fragment, useState, useEffect } from "react";
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
import Input from "../FormInput";
import Button from "../Button";

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

const ListItemInfoGenericModal = ({ open, itemData, cbFormValues }) => {
  const [drawerState, setDrawerState] = useState(false);
  const [itemInfo, setItemInfo] = useState({
    name: null,
    price: null,
    unit: "kg",
  });
  const [item, setItem] = useState(false);

  useEffect(() => {
    if (typeof itemData !== "undefined" && itemData !== null) {
      setItem(itemData);
    }
  }, [itemData, setItem]);

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

  const cbToggleDrawer = (drawerState, data = null) => {
    if (data !== null) {
      updateUnit(data);
    }

    setDrawerState(drawerState);
  };

  return (
    <Box>
      <Modal open={open}>
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
            <Form callBackSubmit={(data) => console.log()}>
              <Input
                label="Price"
                name="itemPrice"
                variant="outlined"
                value={item.price ?? null}
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
                            / {item.unit ?? "kg"}
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
                    onClick={() => cbFormValues(false)}
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
  );
};

export default ListItemInfoGenericModal;
