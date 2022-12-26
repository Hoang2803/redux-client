import { AccordionSummary, Box, styled } from "@mui/material";

export const BoxWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const CustomAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  "& .MuiAccordionSummary-content": {
    flexWrap: "wrap",
    gap: theme.spacing(1.5),
  },
}));

export const BoxChip = styled(Box)(({ theme }) => ({
  width: theme.spacing(10),
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(4),
  display: "flex",
  justifyContent: "center",
}));
