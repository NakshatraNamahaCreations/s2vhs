import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";



function BasicExample() {
  


  return (
    <div className="web">
      <div className="navbar">
        <ul className="nav-tab-ul">
          <li>
            <NavLink to="/user" activeClassName="active">
              User
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/vendor" activeClassName="active">
              Vendor
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/technisian" activeClassName="active">
              Team
            </NavLink>
          </li>
          <li>
            <NavLink to="/category" activeClassName="active">
              Category
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" activeClassName="active">
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/City" activeClassName="active">
              City
            </NavLink>
          </li>
          <li>
            <NavLink to="/pmaterial" activeClassName="active">
     Material
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/expensetype" activeClassName="active">
              Expense Type
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/customertype" activeClassName="active">
              Customer Type
            </NavLink>
          </li>

          <li>
            <NavLink to="/responce" activeClassName="active">
              Response
            </NavLink>
          </li>
          <li>
            <NavLink to="/reference" activeClassName="active">
              Reference
            </NavLink>
          </li>
          <li>
            <NavLink to="/whatsapp" activeClassName="active">
              WhatsApp Template
            </NavLink>
          </li>
          <li>
            <NavLink to="/b2btype" activeClassName="active">
              B2B Type
            </NavLink>
          </li>
          <li>
            <NavLink to="/quotationformat" activeClassName="active">
              Quotation Format
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BasicExample;
