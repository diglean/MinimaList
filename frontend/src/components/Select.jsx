import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { useContext } from "react";
import { TmpItemContext } from "../context/TmpItemContext";
import useLocalization from "./customHooks/translation";

const style = {
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
};

export default function BasicSelect({ options }) {
  const translation = useLocalization();
  const { tmpItemInfo, setTmpItemInfo } = useContext(TmpItemContext);

  const itemProperty = (property, newValue) => {
    setTmpItemInfo((tmpItemInfo) => ({
      ...tmpItemInfo,
      [property]: newValue,
    }));
  };

  const handleChange = (e) => {
    itemProperty("category_id", e.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, zIndex: 99999 }}>
      <FormControl fullWidth>
        <InputLabel sx={{ color: "white" }} id="demo-simple-select-label">
          {translation.category}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tmpItemInfo.category_id}
          label="Category"
          onChange={handleChange}
          sx={style}
          MenuProps={{
            style: { zIndex: 99999 },
          }}
        >
          {options.map(({ id, name }, index) => (
            <MenuItem key={name + id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
