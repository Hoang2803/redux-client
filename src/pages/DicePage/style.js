import { Box, styled, Typography } from "@mui/material";
import { blue, lightBlue } from "@mui/material/colors";

export const CustomTypography = styled(Typography)(({ theme, mode }) => ({
  textAlign: "center",
  fontSize: 40,
  fontWeight: theme.typography.fontWeightMedium,
  color: blue[800],
  ...(mode === "dark" && {
    color: theme.palette.text.primary,
  }),
}));

export const ActivePlayer = styled(Box)(({ theme, player, mode }) => ({
  ...(player === 0 && {
    right: theme.spacing(0),
  }),
  ...(player === 1 && {
    left: theme.spacing(0),
  }),
  position: "absolute",
  top: theme.spacing(2.1),

  width: theme.spacing(3),
  height: theme.spacing(3),
  borderRadius: "50%",
  backgroundColor: blue[800],
  ...(mode === "dark" && {
    backgroundColor: theme.palette.text.primary,
  }),
}));

export const CurrentScore = styled(Box)(({ theme }) => ({
  backgroundColor: lightBlue[600],
  margin: `${theme.spacing(8)} auto`,
  width: theme.spacing(20),
  color: "#fff",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  textAlign: "center",
  borderRadius: theme.shape.borderRadius,
}));

export const DiceFace = styled("img")(({ theme }) => ({
  width: theme.spacing(8),
  height: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
}));
