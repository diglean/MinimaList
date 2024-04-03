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

import styles from "./styles/ListItemInfoGenericModal.module.css";
import TemporaryDrawer from "../Drawer";
import NumberInput from "../NumberInput";
import { useContext } from "react";
import { TmpItemContext } from "../../context/TmpItemContext";

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
  const { tmpItemInfo, setTmpItemInfo, cleanTmpItemInfo } =
    useContext(TmpItemContext);

  useEffect(() => {
    if (typeof itemData !== "undefined" && itemData !== null) {
      setTmpItemInfo(itemData);
    }
  }, [itemData, setTmpItemInfo]);

  const updatePrice = (newPrice) => {
    setTmpItemInfo((itemInfo) => ({
      ...itemInfo,
      price: newPrice,
    }));
  };

  const updateUnit = (newUnit) => {
    setTmpItemInfo((itemInfo) => ({
      ...itemInfo,
      unit: newUnit,
    }));
  };

  const itemProperty = (property, newValue) => {
    setTmpItemInfo((tmpItemInfo) => ({
      ...tmpItemInfo,
      [property]: newValue,
    }));
  };

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
              <Form callBackSubmit={(data) => console.log(data)}>
                <div className={styles.container_input}>
                  <Input
                    label="Name"
                    name="itemName"
                    variant="outlined"
                    value={tmpItemInfo.name}
                  />
                </div>
                <div className={styles.container_input}>
                  <Input
                    label="Price"
                    name="itemPrice"
                    variant="outlined"
                    value={tmpItemInfo.price ?? "0,00"}
                    InputProps={{
                      startAdornment: (
                        <Fragment>
                          <Typography sx={{ color: "#FFF" }}>
                            R$&nbsp;
                          </Typography>
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
                                / {tmpItemInfo.unit ?? "kg"}
                              </Typography>
                            </IconButton>
                          </Tooltip>
                        </Fragment>
                      ),
                    }}
                  />
                </div>
                <div className={styles.container_input}>
                  <NumberInput
                    inputValue={tmpItemInfo.qty}
                    cbHandleChange={(data) => {
                      itemProperty("qty", data);
                    }}
                  />
                </div>
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
    </>
  );
};

export default ListItemInfoGenericModal;
