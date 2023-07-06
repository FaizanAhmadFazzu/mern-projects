import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";

const App = () => (
  <>
    <Header />
    <main>
      <LandingPage />
    </main>
    <Footer />
  </>
);

export default App;
