import { useContext } from "react";
import { Grid } from "@mui/material";

import { TmpItemContext } from "../context/TmpItemContext";
import Button from "./Button";

const ButtonsTmpItem = ({ cbAddItemToList }) => {
  const { cleanTmpItemInfo } = useContext(TmpItemContext);

  return (
    <Grid
      container
      display="flex"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <Grid item>
        <Button
          onClick={() => cleanTmpItemInfo()}
          variant="outlined"
          text="Cancel"
        />
      </Grid>
      <Grid item>
        <Button
          onClick={() => cbAddItemToList()}
          variant="contained"
          text="Confirm"
        />
      </Grid>
    </Grid>
  );
};

export default ButtonsTmpItem;
