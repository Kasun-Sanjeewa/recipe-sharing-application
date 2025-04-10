import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ImproveSkills from "./components/ImproveSkills";
import QouteSection from "./components/QuoteSection";
import ChiefsSection from "./components/ChiefsSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container main">
        <HeroSection />
        <ImproveSkills />
        <QouteSection />
        <ChiefsSection />
      </div>
      <Footer />
    </div>
  );
}

export default App;
