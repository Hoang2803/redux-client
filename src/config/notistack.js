import { closeSnackbar, enqueueSnackbar, SnackbarProvider } from "notistack";

import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const ShowSuccess = (content) => {
  enqueueSnackbar(content, { variant: "success" });
};

export const ShowWarning = (content) => {
  enqueueSnackbar(content, { variant: "warning", allowDownload: true });
};

export const ShowError = (content) => {
  enqueueSnackbar(content, { variant: "error" });
};

export const CustomNotistackProvider = ({ children }) => {
  return (
    <SnackbarProvider
      autoHideDuration={5000}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      action={() => (
        <IconButton onClick={() => closeSnackbar()}>
          <CloseIcon sx={{ color: "#fff" }} />
        </IconButton>
      )}
    >
      {children}
    </SnackbarProvider>
  );
};
