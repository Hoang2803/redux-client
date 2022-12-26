import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { FormControlLabel, Switch } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import MenuList from "./MenuList";
import Theme from "../../Themes";
import {
  CustomAppBar,
  CustomDrawerPc,
  CustomDrawerMb,
  MainContainer,
} from "./style";
import modeSlice from "../../Themes/modeSlice";

const Layout = () => {
  const [openDrawerPc, setOpenDrawerPc] = useState(true);
  const [openDrawerMb, setOpenDrawerMb] = useState(false);
  const [mode, setMode] = useState("light");

  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setOpenDrawerPc(!openDrawerPc);
  };

  const handleCloseDrawerMb = () => {
    setOpenDrawerMb(false);
  };

  const handleChangeMode = (e) => {
    if (e.target.checked) {
      setMode("dark");
      dispatch(modeSlice.actions.changeMode("dark"));
    } else {
      setMode("light");
      dispatch(modeSlice.actions.changeMode("light"));
    }
  };

  return (
    <ThemeProvider theme={Theme()}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <CustomAppBar position="absolute" open={openDrawerPc}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            {/* icon menu of pc screen */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer pc"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                [Theme().breakpoints.up("md")]: openDrawerPc && {
                  display: "none",
                },
                [Theme().breakpoints.down("md")]: { display: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* icon menu of mobile screen */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer mobile"
              sx={{
                marginRight: "36px",
                [Theme().breakpoints.up("md")]: { display: "none" },
              }}
              onClick={() => setOpenDrawerMb(true)}
            >
              <MenuIcon />
            </IconButton>

            {/* drawer of moblibe screen */}
            <CustomDrawerMb open={openDrawerMb} onClose={handleCloseDrawerMb}>
              <Toolbar
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  px: [1],
                }}
              >
                <IconButton onClick={handleCloseDrawerMb}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider />
              <List component="nav">
                <MenuList handleCloseDrawerMb={handleCloseDrawerMb} />
              </List>
            </CustomDrawerMb>
            {/*  */}

            <Box sx={{ flexGrow: 1 }}>
              <IconButton sx={{ color: "#fff" }}>React - Redux</IconButton>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  color="default"
                  onChange={(e) => {
                    handleChangeMode(e);
                  }}
                />
              }
              label={`${mode} mode`}
            />
          </Toolbar>
        </CustomAppBar>
        <CustomDrawerPc variant="permanent" open={openDrawerPc}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MenuList handleCloseDrawerMb={handleCloseDrawerMb} />
          </List>
        </CustomDrawerPc>
        <MainContainer component="main">
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* children */}
            <Outlet />
          </Container>
        </MainContainer>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
