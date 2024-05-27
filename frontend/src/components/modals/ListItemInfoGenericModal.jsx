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

import useLocalization from "../customHooks/translation";

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

const ListItemInfoGenericModal = ({ open, cbFormValues, editItemData }) => {
  const translation = useLocalization();
  const [options, setOptions] = useState([
    { id: 1, name: "Test" },
    { id: 2, name: "Test2" },
  ]);
  const [drawerState, setDrawerState] = useState(false);
  const { tmpItemInfo, tmpEditItemInfo, setTmpItemInfo, cleanTmpItemInfo } =
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
    fetch(ROOT + "/api/category/list", {
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
        <Modal open={open} style={{ zIndex: "99998" }}>
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ paddingBottom: "8px" }}
              >
                {translation.item_info}
              </Typography>
              <Form callbackSubmit={(data) => console.log(data)}>
                <div className={styles.container_input}>
                  <Input
                    label={translation.name}
                    name="itemName"
                    variant="outlined"
                    cbValueChanged={(data) => itemProperty("name", data)}
                    value={editItemData ? tmpEditItemInfo.name : tmpItemInfo.name}
                    required={true}
                  />
                </div>
                <div className={styles.container_input}>
                  <Input
                    label={translation.price}
                    name="itemPrice"
                    variant="outlined"
                    value={editItemData ? tmpEditItemInfo.price : tmpItemInfo.price}
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
                                /{" "}
                                {editItemData
                                  ? tmpEditItemInfo.unit
                                  : tmpItemInfo.unit}
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
                  defaultValue={
                    editItemData ? tmpEditItemInfo.category : tmpItemInfo.category
                  }
                />
                <NumberInput
                  inputValue={editItemData ? tmpEditItemInfo.qty : tmpItemInfo.qty}
                  cbHandleChange={(data) => {
                    itemProperty("qty", data);
                  }}
                />
                <Grid container spacing="0.5" justifyContent="flex-end">
                  <Grid item>
                    <Button
                      variant="text"
                      text={translation.cancel}
                      onClick={() => cbFormValues(false)}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      text={translation.confirm}
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
