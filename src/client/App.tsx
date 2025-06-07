import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Recommendation from "./pages/Recommendation";
import DetailRecipe from "./components/common/details-recipe";
import Recipes from "./pages/recipes";
import Trending from "./pages/trending";
import Header from "./components/common/header";
import Profile from "./pages/profile";
import Categories from "./pages/categories";

function App() {
  return (
    <Router>
      <Header variants="user" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/recipe/:id" element={<DetailRecipe />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </Router>
  );
}

export default App;
