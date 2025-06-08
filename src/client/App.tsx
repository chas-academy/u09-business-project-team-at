import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import DetailRecipe from "./pages/details-recipe";
import Recipes from "./pages/recipes";
import Header from "./components/molecules/header";
import Profile from "./pages/profile";
import Trending from "./pages/trending";

function App() {
  return (
    <Router>
      <Header variants="user" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<DetailRecipe />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </Router>
  );
}

export default App;
