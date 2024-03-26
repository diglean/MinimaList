import { toast, ToastContainer } from "react-toastify";

const Toast = ({ message }) => {
  toast.success(message, { position: "bottom-center", theme: "dark" });

  return (
    <div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Toast;
