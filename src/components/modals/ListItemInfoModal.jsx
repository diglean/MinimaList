import { Box, Fade, Grid, Modal, Typography } from "@mui/material";

import Form from "../Form";
import BasicSelect from "../BasicSelect";
import MenuItems from "../MenuItem";
import Button from "../Button";
import { useState } from "react";
import TemporaryDrawer from "../Drawer";

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
      <TemporaryDrawer />
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
                Type
              </Typography>
              <Form callBackSubmit={(data) => callBackFormValues(data)}>
                <Button onClick={() => cbToggleDrawer(true)}>Teste</Button>
                <TemporaryDrawer
                  open={drawerState}
                  cbToggleDrawer={() => cbToggleDrawer(false)}
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
