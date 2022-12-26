import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

const menuList = [
  {
    icon: <CasinoIcon />,
    text: "Dice playing",
    path: "/dice",
  },
  {
    icon: <FormatListNumberedIcon />,
    text: "Todo List",
    path: "/todo",
  },
];

const CustomListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiListItemText-primary": {
    fontWeight: "600",
  },
}));

const MenuList = ({ handleCloseDrawerMb }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = useMemo(() => {
    return location.pathname;
  }, [location.pathname]);

  const handleClickMenuItem = (path) => {
    navigate(path);
    handleCloseDrawerMb();
  };

  return (
    <>
      {menuList.map((menuItem) => {
        return (
          <Box key={menuItem.text}>
            <ListItemButton onClick={() => handleClickMenuItem(menuItem.path)}>
              <ListItemIcon
                sx={{ color: currentPath === menuItem.path && "active.main" }}
              >
                {menuItem.icon}
              </ListItemIcon>
              <CustomListItemText
                primary={menuItem.text}
                sx={{ color: currentPath === menuItem.path && "active.main" }}
              />
            </ListItemButton>
            <Divider
              sx={{
                backgroundColor: currentPath === menuItem.path && "active.main",
              }}
            />
          </Box>
        );
      })}
    </>
  );
};

export default MenuList;
