import { toast } from "react-toastify";

export const ToastFunction = (title: string) => {
  toast.error(title, {
    position: "top-center",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const ToastSuccessFunction = (title: string) => {
  toast.success(title);
};
