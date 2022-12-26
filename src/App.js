import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import DicePage from "./pages/DicePage";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/dice" element={<DicePage />} />
      </Route>
    </Routes>
  );
}

export default App;
