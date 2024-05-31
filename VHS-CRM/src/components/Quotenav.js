
import { NavLink } from "react-router-dom";

function Quotenav() {
  return (
    <div className="web">
      <div className="navbar">
        <ul className="nav-tab-ul">
          <li>
            <NavLink to="/quotelist" activeClassName="active">
           Quote List
            </NavLink>
          </li>
          <li>
            <NavLink to="/quoteappconfirmed" activeClassName="active">
             Confirmed
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Quotenav;
