// import React from "react";
// import { NavLink, useLocation } from "react-router-dom";

// function Customersernav() {

//   return (
//     <div className="web">
//       <div className="navbar">
//         <ul className="nav-tab-ul">
//         <li>
//             <NavLink to="/customeradd" activeClassName="active" >
//               Customeradd
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/customersearchdetails" activeClassName="active">
//               Treatment
//             </NavLink>
//           </li>
//           <li>
//             <NavLink  activeClassName="active" >
//               Painting
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/payment" activeClassName="active">
//               Payment
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/work" activeClassName="active">
//               Work
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/cservices" activeClassName="active">
//               Services
//             </NavLink>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Customersernav;
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Customersernav({ data }) {
  const location = useLocation();
  return (
    <div className="web">
      <div className="navbar">
        <ul className="nav-tab-ul">
          <li>
            <Link
               className={`hover-tabs ${location.pathname === "/customeradd" ? "active" : ""}`}
              to="/customeradd"
              activeClassName="active"
              state={{ data }}
            >
              Customeradd
            </Link>
          </li>
          <li>
            <Link
               className={`hover-tabs ${location.pathname === "/customersearchdetails" ? "active" : ""}`}
              to="/customersearchdetails"
              activeClassName="active"
            >
              Treatment
            </Link>
          </li>
          <li>
            <Link
               className={`hover-tabs ${location.pathname === "/painting" ? "active" : ""}`}
              to="/painting"
              activeClassName="active"
              state={{ data }}
            >
              Painting
            </Link>
          </li>
          <li>
            <Link
              className={`hover-tabs ${location.pathname === "/payment" ? "active" : ""}`}
              to="/payment"
              activeClassName="active"
              state={{ data }}
            >
              Payment
            </Link>
          </li>
          <li>
            <Link
               className={`hover-tabs ${location.pathname === "/work" ? "active" : ""}`}
              to="/work"
              activeClassName="active"
              state={{ data }}
            >
              Work
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Customersernav;
