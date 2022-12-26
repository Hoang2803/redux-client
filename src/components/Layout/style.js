import { AppBar, Box, Drawer, styled } from "@mui/material";

const drawerWidth = 260;

export const CustomAppBar = styled(AppBar)(({ theme, open }) => ({
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const CustomDrawerPc = styled(Drawer)(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    width: drawerWidth,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    zIndex: theme.zIndex.appBar - 1,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
    }),
  },
}));

export const CustomDrawerMb = styled(Drawer)(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: { display: "none" },
  },
}));

export const MainContainer = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[900],

  flex: 1,
  height: "100vh",
  overflow: "auto",
}));
