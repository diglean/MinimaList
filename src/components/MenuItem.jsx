import MenuItem from "@mui/material/MenuItem";

export default function MenuItems({ items }) {
  return items.map(({ value, name }, index) => (
    <div key={index + name}>
      <MenuItem value={value}>{name}</MenuItem>
    </div>
  ));
}
