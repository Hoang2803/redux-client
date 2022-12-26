import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  Accordion,
  AccordionDetails,
  Box,
  Chip,
  FormControl,
  FormControlLabel,
  List,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import filtersSlide from "./filtersSlice";
import { CustomPaper } from "../../../Themes/styles";
import { CustomAccordionSummary } from "../style";

const FilterTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: "bold",
}));

const Filter = () => {
  const [expanded, setExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState("all");
  const [priorityList, setPriorityList] = useState([]);

  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(filtersSlide.actions.searchFilterChange(""));
    dispatch(filtersSlide.actions.statusFilterChange("all"));
    dispatch(filtersSlide.actions.PriorityFilterChange([]));
  }, [dispatch, location.pathname]);

  // -------- handle when use choose a propority ---------
  const handleAddPriority = (data) => {
    const priorities = priorityList.filter((i) => i !== data);
    setPriorityList([...priorities, data]);
    dispatch(filtersSlide.actions.PriorityFilterChange([...priorities, data]));
    setExpanded(false);
  };

  // --------- handle when user delete a propority --------
  const handleDelete = (data) => {
    const newPriorities = priorityList.filter((i) => i !== data);
    setPriorityList(newPriorities);
    dispatch(filtersSlide.actions.PriorityFilterChange(newPriorities));
    setExpanded(false);
  };

  // -------- handle when user enter in search input --------
  const handleChangeSeach = (e) => {
    setSearchValue(e.target.value);
    dispatch(filtersSlide.actions.searchFilterChange(e.target.value));
  };

  // --------- handle when user choose a type of status --------
  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
    dispatch(filtersSlide.actions.statusFilterChange(e.target.value));
  };

  return (
    <CustomPaper>
      <Box>
        <FilterTitle>Search</FilterTitle>
        <TextField
          placeholder="search todo..."
          fullWidth
          variant="standard"
          value={searchValue}
          onChange={(e) => handleChangeSeach(e)}
          sx={{ mt: 1 }}
        />
      </Box>

      <Box mt={3}>
        <FilterTitle>Filter by status</FilterTitle>
        <FormControl>
          <RadioGroup
            row
            value={status}
            onChange={(e) => handleChangeStatus(e)}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel
              value="completed"
              control={<Radio />}
              label="Completed"
            />
            <FormControlLabel value="todo" control={<Radio />} label="Todo" />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box mt={3}>
        <FilterTitle>Filter by Priority</FilterTitle>
        <Accordion expanded={expanded} sx={{ mt: 1 }}>
          <CustomAccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={() => setExpanded(!expanded)}
          >
            {priorityList.length > 0 ? (
              priorityList.map((data) => {
                return (
                  <Chip
                    key={data}
                    label={data}
                    onDelete={() => handleDelete(data)}
                    color={
                      data === "High"
                        ? "warning"
                        : data === "Medium"
                        ? "info"
                        : "default"
                    }
                  />
                );
              })
            ) : (
              <Typography sx={{ color: "#777" }}>Choose Priority...</Typography>
            )}
          </CustomAccordionSummary>
          <AccordionDetails sx={{ pt: 0, pb: 0 }}>
            <List component="nav" sx={{ pt: 0, pb: 0 }}>
              <ListItemButton onClick={() => handleAddPriority("High")}>
                <ListItemText primary="High" sx={{ color: "#ed6c02" }} />
              </ListItemButton>
              <ListItemButton onClick={() => handleAddPriority("Medium")}>
                <ListItemText primary="Medium" sx={{ color: "#0288d1" }} />
              </ListItemButton>
              <ListItemButton onClick={() => handleAddPriority("Low")}>
                <ListItemText primary="Low" sx={{ color: "#666" }} />
              </ListItemButton>
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>
    </CustomPaper>
  );
};

export default Filter;
