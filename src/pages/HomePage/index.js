import React from "react";

import { Box, styled, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const Container = styled(Box)(({ theme }) => ({
  marginTop: "100px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "600",
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    fontSize: "40px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "30px",
  },
}));

const Icon = styled(SettingsIcon)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    fontSize: "70px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "60px",
  },
  marginTop: "20px",
  "@keyframes rotating": {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
  animation: "rotating 5s linear infinite",
}));

const Homepage = () => {
  return (
    <Container>
      <Title variant="h4">Welcome to React-Redux app</Title>
      <Icon />
    </Container>
  );
};

export default Homepage;
