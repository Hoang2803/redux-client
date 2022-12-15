import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Grid } from "@mui/material";

import Filter from "./components/Filters";
import TodoList from "./components/TodoList";
import { getTodos } from "./components/TodoList/todoSlide";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <h2 className="title">Todo app with Redux</h2>
        <div className="main-content">
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Filter />
            </Grid>

            <Grid item xs={7}>
              <TodoList />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default App;
