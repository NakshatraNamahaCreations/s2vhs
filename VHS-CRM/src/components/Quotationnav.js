import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

function Quotationnav() {
  return (
    <div className="web">
      <div className="navbar">
        <ul className="nav-tab-ul">
          <li>
            <NavLink to="/quotationformat1" activeClassName="active">
              Quotation Formet
            </NavLink>
          </li>
          <li>
            <NavLink to="/region" activeClassName="active">
              Region
            </NavLink>
          </li>
          <li>
            <NavLink to="/amaterial" activeClassName="active">
              A-Material
            </NavLink>
          </li>

          {/* <li>
            <NavLink to="/aregion" activeClassName="active">
              A-Region
            </NavLink>
          </li> */}

          <li>
            <NavLink to="/ajob" activeClassName="active">
              A-Job
            </NavLink>
          </li>
          <li>
            <NavLink to="/termsgroup" activeClassName="active">
              Terms Group
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Quotationnav;
