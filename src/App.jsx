import { BrowserRouter as Router, Routes, Route } from "react-router";
import ResponsiveAppBar from "./components/AppBar";

// import all the pages
import HomePage from "./pages/HomePage";
import AddNewPage from "./pages/AddNewPage";
import CategoriesPage from "./pages/CategoriesPage";
import EditNote from "./pages/EditNote";

/*
  Routes:
  All notes => /
  Add note => /add
  Categories => /categories
*/

function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddNewPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/edit/1" element={<EditNote />} />
      </Routes>
    </Router>
  );
}

export default App;
