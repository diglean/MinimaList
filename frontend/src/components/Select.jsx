import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useContext } from "react";
import { TmpItemContext } from "../context/TmpItemContext";

export default function BasicSelect({ options }) {
  const opts = options;
  const { tmpItemInfo, setTmpItemInfo } = useContext(TmpItemContext);

  const itemProperty = (property, newValue) => {
    setTmpItemInfo((tmpItemInfo) => ({
      ...tmpItemInfo,
      [property]: newValue,
    }));
  };

  const handleChange = (event) => {
    itemProperty("category", event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel sx={{ color: "white" }} id="demo-simple-select-label">
          Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tmpItemInfo.category.name}
          label="Category"
          onChange={handleChange}
          sx={{
            color: "white",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#FFF",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#FFF",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#FFF",
            },
            ".MuiSvgIcon-root ": {
              fill: "white !important",
            },
          }}
        >
          options.map()
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
