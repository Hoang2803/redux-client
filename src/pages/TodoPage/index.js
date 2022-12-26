import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Grid, Typography } from "@mui/material";
import { getTodos } from "./TodoList/todoSlice";
import { BoxWrapper } from "./style";

import Filter from "./Filters";
import TodoList from "./TodoList";
import { CustomPaper } from "../../Themes/styles";

const TodoPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <BoxWrapper>
      <CustomPaper sx={{ width: "95%" }}>
        <Typography variant="h4" textAlign="center" mb={3}>
          Todo app with Redux
        </Typography>
        <Grid container spacing={2}>
          <Grid item lg={5.5} md={12} sm={12} xs={12}>
            <Filter />
          </Grid>

          <Grid item lg={6.5} md={12} sm={12} xs={12}>
            <TodoList />
          </Grid>
        </Grid>
      </CustomPaper>
    </BoxWrapper>
  );
};

export default TodoPage;
