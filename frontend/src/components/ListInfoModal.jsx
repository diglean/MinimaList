import * as React from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Fade, Grid } from "@mui/material";
import Modal from "@mui/material/Modal";

import Form from "../components/Form";
import Button from "../components/Button";
import Input from "../components/Input";

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

const ROOT = "http://localhost:8000";

export default function ListInfoModal({ open, callBackFormValues }) {
  const navigate = useNavigate();
  const addItensToList = useCallback(
    (data) => {
      const body = JSON.stringify({
        name: data.name,
      });

      fetch(ROOT + "/api/list/new", {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          let data = response.json();
          let id = data.value.id;

          // navigate("/additenstolist", { state: { list_id: id } });
        })
        .catch((err) => console.log(err));
    },
    [navigate]
  );

  return (
    <div>
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
    </div>
  );
}