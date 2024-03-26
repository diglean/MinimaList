import { Backdrop } from "@mui/material";
import PropagateLoader from "react-spinners/PropagateLoader";

const Loading = ({ open }) => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <PropagateLoader
          color={"#FFF"}
          loading={open}
          aria-label="Loading Spinner"
        />
      </Backdrop>
    </div>
  );
};

export default Loading;
