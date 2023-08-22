import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/SingleNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote";
// import { BrowserRouter as Router } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/register",
    element: <RegisterScreen />,
  },
  {
    path: "/mynotes",
    element: <MyNotes />,
  },
  {
    path: "/createnote",
    element: <CreateNote />,
  },
  {
    path: "/note/:noteId",
    element: <SingleNote />,
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
