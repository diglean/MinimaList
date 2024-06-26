import * as React from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Fade, Grid } from "@mui/material";
import Modal from "@mui/material/Modal";

import Form from "../components/Form";
import Button from "../components/Button";
import Input from "../components/FormInput";

import styles from './styles/ListInfoModal.module.css';
import useTranslation from "./customHooks/translation";

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

export default function ListInfoModal({ open, cbCloseModal }) {
  const translation = useTranslation();
  const navigate = useNavigate();
  const cbCreateList = useCallback(
    (data) => {
      fetch(ROOT + "/api/list/create", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          navigate("/selected-items", { state: { list_id: data.id } });
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
                {translation.listName}
              </Typography>
              <Form callbackSubmit={(data) => cbCreateList(data)}>
                <Input
                  label={translation.name}
                  name="name"
                  variant="outlined"
                  required={true}
                />
                <div className={styles.buttons}>
                  <Grid container spacing="0.5" justifyContent="flex-end">
                    <Grid item>
                      <Button
                        variant="text"
                        text={translation.cancel}
                        onClick={() => cbCloseModal(false)}
                      />
                    </Grid>
                    <Grid item>
                      <Button variant="contained" text="Ok" type="submit" />
                    </Grid>
                  </Grid>
                </div>
              </Form>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </div>
  );
}
