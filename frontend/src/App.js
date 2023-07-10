import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MyNotes from "./screens/MyNotes/MyNotes";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/mynotes",
    element: <MyNotes />,
  },
]);

const App = () => (
  <>
    <Header />
    <main>
      <RouterProvider router={router} />
    </main>
    <Footer />
  </>
);

export default App;
