import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

function Enquiryfollowupnav() {
  // const [activeButton, setActiveButton] = useState(null);

  // const handleButtonClick = (button) => {
  //   setActiveButton(button);
  // };
  // let filteredData = [];
  // if (activeButton === "yesterday") {
  //   const today = new Date();
  //   const yesterday = new Date(today);
  //   yesterday.setDate(yesterday.getDate() - 1);
  //   const yesterdayDate = yesterday.toISOString().split("T")[0];
  //   filteredData = data.filter((item) => item.date === yesterdayDate);
  // } else if (activeButton === "today") {
  //   const today = new Date();
  //   const todayDate = today.toISOString().split("T")[0];
  //   filteredData = data.filter((item) => item.date === todayDate);
  // } else if (activeButton === "thisWeek") {
  //   const today = new Date();
  //   const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
  //   const weekEnd = new Date(
  //     today.setDate(today.getDate() - today.getDay() + 6)
  //   );
  //   filteredData = data.filter((item) => {
  //     const itemDate = new Date(item.date);
  //     return itemDate >= weekStart && itemDate <= weekEnd;
  //   });
  // } else if (activeButton === "lastWeek") {
  //   const today = new Date();
  //   const weekStart = new Date(
  //     today.setDate(today.getDate() - today.getDay() - 7)
  //   );
  //   const weekEnd = new Date(
  //     today.setDate(today.getDate() - today.getDay() + 6)
  //   );
  //   filteredData = data.filter((item) => {
  //     const itemDate = new Date(item.date);
  //     return itemDate >= weekStart && itemDate <= weekEnd;
  //   });
  // } else if (activeButton === "thisMonth") {
  //   const today = new Date();
  //   const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  //   const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  //   filteredData = data.filter((item) => {
  //     const itemDate = new Date(item.date);
  //     return itemDate >= monthStart && itemDate <= monthEnd;
  //   });
  // } else if (activeButton === "thisYear") {
  //   const today = new Date();
  //   const yearStart = new Date(today.getFullYear(), 0, 1);
  //   const yearEnd = new Date(today.getFullYear(), 11, 31);
  //   filteredData = data.filter((item) => {
  //     const itemDate = new Date(item.date);
  //     return itemDate >= yearStart && itemDate <= yearEnd;
  //   });
  // }
  // return (
  //   <div className="web">
  //     <div className="navbar">
  //       <ul className="nav-tab-ul">
  //         <li>
  //           <NavLink onClick={() => handleButtonClick("today")} to="/etoday" activeClassName="active">
  //             Today
  //           </NavLink>{" "}
  //         </li>
  //         <li>
  //           <NavLink  to="/etommorow" activeClassName="active">
  //             Tomorrow
  //           </NavLink>{" "}
  //         </li>
  //         <li>
  //           <NavLink onClick={() => handleButtonClick("yesterday")} to="/eyesterday" activeClassName="active">
  //             Yesterday
  //           </NavLink>{" "}
  //         </li>
  //         <li>
  //           <NavLink onClick={() => handleButtonClick("thisWeek")} to="/ethisweek" activeClassName="active">
  //             This week
  //           </NavLink>{" "}
  //         </li>
  //         <li>
  //           <NavLink onClick={() => handleButtonClick("lastWeek")} to="/elastweek" activeClassName="active">
  //             Last Week
  //           </NavLink>{" "}
  //         </li>
  //         <li>
  //           <NavLink to="/enextweek" activeClassName="active">
  //             Next Week
  //           </NavLink>{" "}
  //         </li>
  //         <li>
  //           <NavLink onClick={() => handleButtonClick("thisMonth")} to="/ethismonth" activeClassName="active">
  //             This month
  //           </NavLink>{" "}
  //         </li>
  //         <li>
  //           <NavLink to="/ecallletter" activeClassName="active">
  //             Call Later
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink to="/econfirm" activeClassName="active">
  //             Confirmed
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink to="/enotintrested" activeClassName="active">
  //             Not interested
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink to="/esend" activeClassName="active">
  //             Send Template
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink to="/etemplate" activeClassName="active">
  //             Todays Scheduled Templates
  //           </NavLink>
  //         </li>
  //         {activeButton === "yesterday" && (
  //           <YesterdayButton data={filteredData} />
  //         )}
  //         {activeButton === "today" && <TodayButton data={filteredData} />}
  //         {activeButton === "thisWeek" && (
  //           <ThisWeekButton data={filteredData} />
  //         )}
  //         {activeButton === "lastWeek" && (
  //           <LastWeekButton data={filteredData} />
  //         )}{" "}
  //         {activeButton === "thisMonth" && (
  //           <ThisMonthButton data={filteredData} />
  //         )}
  //         {activeButton === "thismonth" && (
  //           <ThisYearButton data={filteredData} />
  //         )}{" "}
  //       </ul>
  //     </div>
  //   </div>
  // );
  return (
    <div className="web">
      <div className="navbar">
        <ul className="nav-tab-ul">
          <li>
            <NavLink to="/etoday" activeClassName="active">
              Today
            </NavLink>
          </li>
          <li>
            <NavLink to="/etommorow" activeClassName="active">
              Tomorrow
            </NavLink>
          </li>
          <li>
            <NavLink to="/eyesterday" activeClassName="active">
              Yesterday
            </NavLink>
          </li>
          <li>
            <NavLink to="/ethisweek" activeClassName="active">
              This week
            </NavLink>
          </li>
          <li>
            <NavLink to="/elastweek" activeClassName="active">
              Last Week
            </NavLink>
          </li>
          <li>
            <NavLink to="/enextweek" activeClassName="active">
              Next Week
            </NavLink>
          </li>
          <li>
            <NavLink to="/ethismonth" activeClassName="active">
              This month
            </NavLink>
          </li>
          <li>
            <NavLink to="/ecallletter" activeClassName="active">
              Call Later
            </NavLink>
          </li>
          <li>
            <NavLink to="/econfirm" activeClassName="active">
              Confirmed
            </NavLink>
          </li>
          <li>
            <NavLink to="/enotintrested" activeClassName="active">
              Not interested
            </NavLink>
          </li>
          <li>
            <NavLink to="/esend" activeClassName="active">
              Send Template
            </NavLink>
          </li>
          <li>
            <NavLink to="/etemplate" activeClassName="active">
              Todays Scheduled Templates
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );

}

export default Enquiryfollowupnav;
