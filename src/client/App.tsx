import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import DetailRecipe from "./pages/details-recipe";
import Recipes from "./pages/recipes";
import Header from "./components/molecules/header";
import Profile from "./pages/profile";
import Trending from "./pages/trending";
import Lists from "./pages/lists";
import { ModalProvider } from "./context/ModalContext";
import { UserProvider } from "./context/UserContext";
import Wrapper from "./components/templates/wrapper";

function App() {
  return (
    <UserProvider>
      <Router>
        <ModalProvider>
          <Wrapper>
            <Header variants="guest" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipe/:id" element={<DetailRecipe />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/list/:id" element={<Lists />} />
              {/* Redirect all other paths to Home page */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Wrapper>
        </ModalProvider>
      </Router>
    </UserProvider>
  );
}

export default App;
