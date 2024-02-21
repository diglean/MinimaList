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

const gridStyles = {
  backgroundColor: "blue",
  paddingBottom: 2,
  paddingRight: 2,
  marginTop: 2,
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: 500,
};

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

const NumericFormatCustom = forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      thousandsGroupStyle="thousand"
      valueIsNumericString
      prefix="R$"
    />
  );
});

export default function ListItemInfoModal({ open, callBackFormValues }) {
  const [itemUnit, setItemUnit] = useState("");
  const [drawerState, setDrawerState] = useState(false);

  const cbToggleDrawer = (data, drawerState) => {
    setItemUnit(data);
    setDrawerState(drawerState);
  };

  return (
    <div>
      <TemporaryDrawer
        drawerState={drawerState}
        cbToggleDrawer={(data, drawerState) =>
          cbToggleDrawer(data, drawerState)
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
              <Form callBackSubmit={(data) => callBackFormValues(data)}>
                <Input
                  label="Price"
                  name="itemPrice"
                  variant="outlined"
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
                            <Typography sx={{ color: "#FFF" }}>/ Kg</Typography>
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
