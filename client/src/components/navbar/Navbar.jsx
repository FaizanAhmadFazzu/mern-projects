import "./navbar.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext)
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">lamabooking</span>
        </Link>
        <div className="navItems">
          {
            user ? user.username : (
              <div className="navItems">
                <button className="navButton">Register</button>
                <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
                  <button className="navButton">Login</button>
                </Link>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
