import { Box, Fade, Grid, Modal, Typography } from "@mui/material";
import Button from "../Button";

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

const GenericModal = ({
  open,
  primaryText,
  secondaryText,
  primaryButtonProps,
  secondaryButtonProps,
  data = null,
}) => {
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
              <Typography id="modal-primary-text" variant="h5">
                {primaryText}
              </Typography>
              <Typography
                id="modal-secondary-text"
                component="span"
                sx={{ paddingBottom: "10px" }}
              >
                {secondaryText}
              </Typography>
              <Grid container spacing="0.5" justifyContent="flex-end">
                <Grid item>
                  <Button {...secondaryButtonProps} />
                </Grid>
                <Grid item>
                  <Button {...primaryButtonProps} />
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </div>
  );
};

export default GenericModal;
