import { Fragment, useState, useContext } from "react";
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
import { TmpItemContext } from "../../context/TmpItemContext";
import BasicSelect from "../Select";
import { useEffect } from "react";

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

const ROOT = "http://localhost:8000";

const ListItemInfoGenericModal = ({ open, cbFormValues }) => {
  const [options, setOptions] = useState([
    { id: 1, name: "Test" },
    { id: 2, name: "Test2" },
  ]);
  const [drawerState, setDrawerState] = useState(false);
  const { tmpItemInfo, setTmpItemInfo, cleanTmpItemInfo } =
    useContext(TmpItemContext);

  const updateUnit = (newUnit) => {
    setTmpItemInfo((itemInfo) => ({
      ...itemInfo,
      unit: newUnit,
    }));
  };

  const itemProperty = (property, newValue) => {
    if (property === "price") {
      newValue = newValue.replace(/\D/g, "");
      newValue = newValue.replace(/(\d)(\d{2})$/, "$1,$2");
      newValue = newValue.replace(/(?=(\d{3})+(\D))\B/g, ".");
    }

    if (property === "name" && newValue === "") {
      cleanTmpItemInfo();
    }

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

  useEffect(() => {
    fetch(ROOT + "/api/category/list-category", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setOptions(data);
      });
  }, [setOptions]);

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
                    cbValueChanged={(data) => itemProperty("name", data)}
                    value={tmpItemInfo.name}
                    required={true}
                  />
                </div>
                <div className={styles.container_input}>
                  <Input
                    label="Price"
                    name="itemPrice"
                    variant="outlined"
                    value={tmpItemInfo.price ?? null}
                    cbValueChanged={(data) => itemProperty("price", data)}
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
                <BasicSelect
                  options={options}
                  defaultValue={tmpItemInfo.category}
                />
                <NumberInput
                  inputValue={tmpItemInfo.qty}
                  cbHandleChange={(data) => {
                    itemProperty("qty", data);
                  }}
                />
                <Grid container spacing="0.5" justifyContent="flex-end">
                  <Grid item>
                    <Button
                      variant="text"
                      text="Close"
                      onClick={() => cbFormValues(false)}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      text="Confirm"
                      onClick={() => cbFormValues(true)}
                    />
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
