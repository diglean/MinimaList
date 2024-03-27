import { toast, ToastContainer } from "react-toastify";

const Toast = () => {
  let toasted = null;
  const toast = ({message}) => {
    return toast.success(message, { position: "bottom-center", theme: "dark" });
  }
};

export default Toast;
