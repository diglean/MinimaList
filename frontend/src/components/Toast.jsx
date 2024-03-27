import { toast, ToastContainer } from "react-toastify";

function Toast({ message }) {
  return toast.success(message, { position: "bottom-center", theme: "dark" });
};

export default Toast;
