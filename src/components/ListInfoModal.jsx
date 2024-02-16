import * as React from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Fade, Grid, ThemeProvider } from "@mui/material";
import Modal from "@mui/material/Modal";

import theme from "../pages/theme";
import Form from "./Form";
import Button from "./Button";
import Input from "./Input";

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

export default function ListInfoModal({ open, callBackFormValues }) {
  const navigate = useNavigate();
  const addItensToList = useCallback((data) => {
    navigate("/additenstolist", { state: { listName: data.name } });
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Fade in={open} timeout={400}>
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ paddingBottom: "8px" }}
                >
                  Name of the list
                </Typography>
                <Form callBackSubmit={(data) => addItensToList(data)}>
                  <Input label="Name" name="name" variant="outlined" />
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
      </ThemeProvider>
    </div>
  );
}
