import { Toaster } from "react-hot-toast";

const ToasterAlert = () => (
  <Toaster
    toastOptions={{
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
      error: {
        duration: 4000,
        iconTheme: {
          primary: "#FF7276",
          secondary: "#fff",
        },
      },
      success: {
        duration: 2000,
        iconTheme: {
          primary: "#4b5e26",
          secondary: "#fff",
        },
      },
    }}
  />
);

export default ToasterAlert;
