import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

function Customernav() {
  return (
    <div className="web">
      <div className="navbar">
        <ul className="nav-tab-ul">
          <li>
            <NavLink to="/customeradd" activeClassName="active">
              Customer Add
            </NavLink>
          </li>
          <li>
            <NavLink to="/customersearch" activeClassName="active">
              Customer Search
            </NavLink>
          </li>
          <li>
            <NavLink to="/customerimport" activeClassName="active">
              Import / Export Bulk
            </NavLink>
          </li>
          <li>
            <NavLink to="/customersend" activeClassName="active">
              Send Template
            </NavLink>
          </li>
          <li>
            <NavLink to="/customerschedule" activeClassName="active">
              Todays Scheduled Templates
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Customernav;
