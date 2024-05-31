import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

function Quotefollowupnav() {
  return (
    <div className="web">
      <div className="navbar">
        <ul className="nav-tab-ul">
          <li>
            <NavLink to="/quotetoday" activeClassName="active">
              Today
            </NavLink>
          </li>
          <li>
            <NavLink to="/quotetommorow" activeClassName="active">
              Tomorrow
            </NavLink>
          </li>
          <li>
            <NavLink to="/quoteyesterday" activeClassName="active">
              Yesterday
            </NavLink>
          </li>
          <li>
            <NavLink to="/quotethisweek" activeClassName="active">
              This week
            </NavLink>
          </li>
          <li>
            <NavLink to="/quotelastweek" activeClassName="active">
              Last Week
            </NavLink>
          </li>
          <li>
            <NavLink to="/quotenextweek" activeClassName="active">
              Next Week
            </NavLink>
          </li>
          <li>
            <NavLink to="/quotethismonth" activeClassName="active">
              This month
            </NavLink>
          </li>
          <li>
            <NavLink to="/quotecall" activeClassName="active">
              Call Later
            </NavLink>
          </li>
          <li>
            <NavLink to="/quoteconfirm" activeClassName="active">
              Confirmed
            </NavLink>
          </li>
          <li>
            <NavLink to="/quotenote" activeClassName="active">
              Not interested
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/quotesend" activeClassName="active">
              Send Template
            </NavLink>
          </li>
          <li>
            <NavLink to="/surveycancel" activeClassName="active">
              Todays Scheduled Templates
            </NavLink>
          </li> */}
        </ul>
      </div>
    </div>
  );
}

export default Quotefollowupnav;
