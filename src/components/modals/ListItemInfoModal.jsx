import { Box, Fade, Grid, Modal, Typography } from "@mui/material";

import Form from "../Form";
import BasicSelect from "../BasicSelect";
import MenuItems from "../MenuItem";
import Button from "../Button";
import { useState } from "react";

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

const values = [
  {
    value: "kg",
    name: "Kg",
  },
  {
    value: "g",
    name: "g",
  },
  {
    value: "l",
    name: "L",
  },
];

export default function ListItemInfoModal({ open, callBackFormValues }) {
  const [itemUnit, setItemUnit] = useState("");

  const handleChangeItemUnit = (event) => {
    setItemUnit(event.target.value);
  };

  return (
    <div>
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
                <BasicSelect
                  label="Unit"
                  onChange={handleChangeItemUnit}
                  value={itemUnit}
                >
                  <MenuItems items={values} />
                </BasicSelect>
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
