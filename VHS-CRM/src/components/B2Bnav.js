import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

function B2Bnav() {
  return (
    <div className="web">
      <div className="navbar">
        <ul className="nav-tab-ul">
          <li>
            <NavLink to="/b2badd" activeClassName="active">
              B2B Add
            </NavLink>
          </li>
          <li>
            <NavLink to="/b2bimport" activeClassName="active">
              Import / Export Bulk
            </NavLink>
          </li>
          <li>
            <NavLink to="/b2bsearch" activeClassName="active">
              B2B Search
            </NavLink>
          </li>
          <li>
            <NavLink to="/b2btemplate" activeClassName="active">
              Send Template
            </NavLink>
          </li>
          <li>
            <NavLink to="/b2bschedule" activeClassName="active">
              Todays Scheduled Templates
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default B2Bnav;
