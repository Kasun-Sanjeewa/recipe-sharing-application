import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container main">
        <HeroSection />
      </div>
    </div>
  );
}

export default App;
