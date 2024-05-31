import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";


function Surveynav() {
  

  return (
    <div className="web">
      <div className="navbar">
        <ul className="nav-tab-ul">
          <li>
            <NavLink to="/surveycategory" activeClassName="active">
              Survey calender view
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/surveysearch" activeClassName="active">
              Search
            </NavLink>
          </li> */}
            {/* <li>
            <NavLink to="/stoday" activeClassName="active" >
              Today
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/surveycancel" activeClassName="active">
              Cancelled Survey
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Surveynav;
