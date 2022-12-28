import { Box, styled } from "@mui/material";

export const CustomBoxDice = styled(Box)(({ theme, number }) => ({
  transformStyle: "preserve-3d",
  ...(number === 1 && {
    animation: "diceRotate 3s",
    transform: "rotateX(0deg) rotateY(0deg)",
  }),
  ...(number === 2 && {
    animation: "diceRotate 3s",
    transform: "rotateX(-180deg) rotateY(0deg)",
  }),
  ...(number === 3 && {
    animation: "diceRotate 3s",
    transform: "rotateX(-90deg) rotateY(0deg)",
  }),
  ...(number === 4 && {
    animation: "diceRotate 3s",
    transform: "rotateX(90deg) rotateY(0deg)",
  }),
  ...(number === 5 && {
    animation: "diceRotate 3s",
    transform: "rotateX(0deg) rotateY(90deg)",
  }),
  ...(number === 6 && {
    animation: "diceRotate 3s",
    transform: "rotateX(0deg) rotateY(-90deg)",
  }),

  "@keyframes diceRotate": {
    "0%": {
      transform: "rotateX(0deg) rotateY(0deg)",
    },
    "100%": {
      transform: "rotateX(360deg) rotateY(360deg)",
    },
  },
}));

export const CustomDice = styled("img")(({ theme, position }) => ({
  position: "absolute",
  width: "60px",
  height: "60px",

  ...(position === "top" && {
    transform: "translateX(-30px) translateY(-60px) rotateX(90deg)",
  }),
  ...(position === "bottom" && {
    transform: "translateX(-30px) translateY(0) rotateX(90deg)",
  }),
  ...(position === "front" && {
    transform: "translateX(-30px) translateY(-30px) translateZ(30px)",
  }),
  ...(position === "back" && {
    transform: "translateX(-30px) translateY(-30px) translateZ(-30px)",
  }),
  ...(position === "left" && {
    transform: "translateX(-60px) translateY(-30px) rotateY(90deg)",
  }),
  ...(position === "right" && {
    transform: "translateY(-30px) rotateY(90deg)",
  }),
}));
