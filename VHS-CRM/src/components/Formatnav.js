
import { NavLink } from "react-router-dom";

function Quotenav() {
  return (
    <div className="web">
      <div className="navbar">
        <ul className="nav-tab-ul">
          <li>
            <NavLink to="/termsgroup" activeClassName="active">
        Terms and Condition
            </NavLink>
          </li>
          <li>
            <NavLink to="/qheader" activeClassName="active">
            Header
            </NavLink>
          </li>
          <li>
            <NavLink to="/qfooter" activeClassName="active">
            Footer
            </NavLink>
          </li>
          <li>
            <NavLink to="/addbank" activeClassName="active">
            bank
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Quotenav;
