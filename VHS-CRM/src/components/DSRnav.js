import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

function DSRnav() {
  return (
    <div className="web">
      <div className="navbar">
        <ul className="nav-tab-ul">
          <li>
            <NavLink to="/dsrcategory" activeClassName="active">
              DSR calendar view
            </NavLink>
          </li>
         
        </ul>
      </div>
    </div>
  );
}

export default DSRnav;
