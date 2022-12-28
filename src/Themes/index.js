import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { getMode } from "../redux/selectors/modeSelector";

const Theme = () => {
  const mode = useSelector(getMode);

  return createTheme({
    palette: {
      mode: mode,
      active: {
        main: "#304ffe",
      },
    },
  });
};

export default Theme;
