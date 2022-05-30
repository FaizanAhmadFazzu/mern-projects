import './App.css';
import Header from './Header';
import Home from './Home';
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from './firebase'
import { useStateValue } from './StateProvider';
import Checkout from './Checkout';

function App() {

  const [{ basket, user }, dispatch] = useStateValue();

  useEffect(() => {
    // will only runs once when the app component loads...

    onAuthStateChanged(auth, (authUser) => {
      console.log("THE USER IS >>>", authUser);

      if(authUser){
        // the user just logged in / the user was logged in 
        
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // the user is logged in 
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
  }, [dispatch])

  
  // BEM
  return (
    <div className="app">
      <Router>  
        <Routes>
          <Route path="/">
            <Route index element={<><Header /><Home /></>} />
            <Route path="login" element={<Login />} />
            <Route path="checkout" element={<Checkout />} />
            {/*<Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route path="new"
              element={<New inputs={userInputs} title="Add New User" />} />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route path="new"
              element={<New inputs={userInputs} title="Add New Product" />} />
            </Route> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
