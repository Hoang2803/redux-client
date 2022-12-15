import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  FormControl,
  FormControlLabel,
  List,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import filtersSlide from "./filtersSlide";

import "./Filter.css";

const Filter = () => {
  const [expanded, setExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState("all");
  const [priorityList, setPriorityList] = useState([]);

  const dispatch = useDispatch();

  const handleAddPriority = (data) => {
    const priorities = priorityList.filter((i) => i !== data);
    setPriorityList([...priorities, data]);
    dispatch(filtersSlide.actions.PriorityFilterChange([...priorities, data]));
    setExpanded(false);
  };

  const handleDelete = (data) => {
    const newPriorities = priorityList.filter((i) => i !== data);
    setPriorityList(newPriorities);
    dispatch(filtersSlide.actions.PriorityFilterChange(newPriorities));
    setExpanded(false);
  };

  const handleChangeSeach = (e) => {
    setSearchValue(e.target.value);
    dispatch(filtersSlide.actions.searchFilterChange(e.target.value));
  };

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
    dispatch(filtersSlide.actions.statusFilterChange(e.target.value));
  };

  return (
    <div className="filter">
      <div className="filter-search">
        <p className="filter-title">Search</p>
        <div className="search-input">
          <TextField
            placeholder="search todo..."
            fullWidth
            variant="standard"
            value={searchValue}
            onChange={(e) => handleChangeSeach(e)}
          />
        </div>
      </div>

      <div className="filter-status">
        <p className="filter-title">Filter by status</p>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
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
      </div>

      <div className="filter-priority">
        <p className="filter-title">Filter by Priority</p>
        <Accordion expanded={expanded} sx={{ mt: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={() => setExpanded(!expanded)}
          >
            {priorityList.length > 0 ? (
              priorityList.map((data) => {
                return (
                  <Chip
                    label={data}
                    onDelete={() => handleDelete(data)}
                    color={
                      data === "High"
                        ? "warning"
                        : data === "Medium"
                        ? "info"
                        : "default"
                    }
                    sx={{ mr: 3 }}
                  />
                );
              })
            ) : (
              <Typography sx={{ color: "#777" }}>Choose Priority...</Typography>
            )}
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0, pb: 0 }}>
            <List
              component="nav"
              aria-label="secondary mailbox folder"
              sx={{ pt: 0, pb: 0 }}
            >
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
      </div>
    </div>
  );
};

export default Filter;
