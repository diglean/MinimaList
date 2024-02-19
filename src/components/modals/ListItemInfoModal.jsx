import { useState } from "react";

import { Box, Fade, Grid, Modal, Typography } from "@mui/material";

import Form from "../Form";
import BasicSelect from "../BasicSelect";
import MenuItems from "../MenuItem";
import Button from "../Button";
import TemporaryDrawer from "../Drawer";
import Input from "../Input";

const gridStyles = {
  backgroundColor: "blue",
  paddingBottom: 2,
  paddingRight: 2,
  marginTop: 2,
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: 500
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

export default function ListItemInfoModal({ open, callBackFormValues }) {
  const [itemUnit, setItemUnit] = useState("");
  const [drawerState, setDrawerState] = useState(false);

  const cbToggleDrawer = (data) => {
    setDrawerState(data);
  };

  const handleChangeItemUnit = (event) => {
    setItemUnit(event.target.value);
  };

  return (
    <div>
      <TemporaryDrawer
        drawerState={drawerState}
        cbToggleDrawer={() => cbToggleDrawer(false)}
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
                <Grid container spacing={0.5} justifyContent="space-between" >
                  <Grid item xs={4} alignItems="stretch" style={{ display: "flex" }}>
                    <Button
                      onClick={() => cbToggleDrawer(true)}
                      variant="outlined"
                      text="Teste"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Input
                      label="Price"
                      name="itemPrice"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing="0.5" justifyContent="flex-end">
                  <Grid item>
                    
                  </Grid>
                  <Grid item>
                    <Button
                      variant="text"
                      text="Cancel"
                      onClick={() => callBackFormValues(false)}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="text"
                      text="Ok"
                      type="submit"
                      color="styles.contained_white_button"
                    />
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
