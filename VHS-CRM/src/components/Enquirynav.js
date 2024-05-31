import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

function Enquirynav() {
  return (
    <div className="web">
      <div className="navbar">
        <ul className="nav-tab-ul">
          <li>
            <NavLink to="/enquiryadd" activeClassName="active">
            Enquiry Add
            </NavLink>
          </li>
          <li>
            <NavLink to="/enquirynew" activeClassName="active">
            Enquiry New
            </NavLink>
          </li>
          <li>
            <NavLink to="/new" activeClassName="active">
            New
            </NavLink>
          </li>
          <li>
            <NavLink to="/enquirytoday" activeClassName="active">
            Today
            </NavLink>
          </li>
          <li>
            <NavLink to="/enquirysearch" activeClassName="active">
              Enquiry Search
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Enquirynav;
