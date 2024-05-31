
import { NavLink } from "react-router-dom";

function Quotenav() {
  return (
    <div className="web">
      <div className="navbar">
        <ul className="nav-tab-ul">
          <li>
            <NavLink to="/region" activeClassName="active">
        Region
            </NavLink>
          </li>
          <li>
            <NavLink to="/amaterial" activeClassName="active">
            Material
            </NavLink>
          </li>
          <li>
            <NavLink to="/ajob" activeClassName="active">
            Job
            </NavLink>
          </li>
         
        </ul>
      </div>
    </div>
  );
}

export default Quotenav;
