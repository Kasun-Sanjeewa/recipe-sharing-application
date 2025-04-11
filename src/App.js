import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Settings from "./pages/Settings";
import Favorites from "./pages/Favorites";
import ManageRecipes from "./components/ManageRecipes";
import AuthForm from "./components/AuthForm";

function App() {
  const [user, setUser] = useState(null);

  // Optional: persist login
  useEffect(() => {
    const savedUser = localStorage.getItem("wildcook_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("wildcook_user", JSON.stringify(userData)); // persist login
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("wildcook_user");
  };

  if (!user) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Navbar onLogout={handleLogout} />
      <div className="container main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/manage-recipes" element={<ManageRecipes />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
