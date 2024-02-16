import * as React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles, styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import Input from "./Input";

export default function BasicSelect(props) {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <Input
            id="demo-simple-select-label"
            label="Unit"
            name="itemUnit"
            variant="outlined"
            select
          >
            {props.children}
          </Input>
        </FormControl>
      </Box>
    </div>
  );
}
