import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const admin = JSON.parse(sessionStorage.getItem("admin"));

  // Load isOpen state from sessionStorage or default to true
  const [isOpen, setIsOpen] = useState(
    JSON.parse(sessionStorage.getItem("sidebarOpen")) ?? true
  );

  // Save isOpen state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      path: "/home",
      name: "Home",
      // icon: <FaTh />,
    },
  ];
  if (admin && admin.master === true) {
    menuItem.push({
      path: "/user",
      name: "Master",
    });
  }

  if (admin && admin.customer === true) {
    menuItem.push({
      path: "/customersearch",
      name: "Customer",
    });
  }

  if (admin && admin.enquiry === true) {
    menuItem.push({
      path: "/new",
      name: "Enquiry",
    });
    // icon: <FaRegChartBar />,
  }
  if (admin && admin.enquiryFollowup === true) {
    menuItem.push({
      path: "/enquiryfollowup",
      name: "Enquiry Follow Up",
    });
  }

  if (admin && admin.survey === true) {
    menuItem.push({
      path: "/surveycategory",
      name: "Survey",
      // icon: <FaShoppingBag />,
    });
  }

  if (admin && admin.quote === true) {
    menuItem.push({
      path: "/quotelist",
      name: "Quote",
      // icon: <FaThList />,
    });
  }

  if (admin && admin.quoteFollowup === true) {
    menuItem.push({
      path: "/quotefollowup",
      name: "Quotefollowup",
      // icon: <FaThList />,
    });
  }

  if (admin && admin.dsr === true) {
    menuItem.push({
      path: "/dsrcategory",
      name: "DSR",
      // icon: <FaThList />,
    });
  }

  // menuItem.push({
  //   path: "/callerdesk",
  //   name: "Callerdesk",
  //   // icon: <FaThList />,
  // });

  if (admin && admin.runningProjects === true) {
    menuItem.push({
      path: "/runningproject",
      name: "RunningProject",
      // icon: <FaThList />,
    });
  }

  if (admin && admin.closeProjects === true) {
    menuItem.push({
      path: "/closedproject",
      name: "Closeproject",
      // icon: <FaThList />,
    });
  }
  if (admin && admin.paymentReport === true) {
    menuItem.push({
      path: "/paymentcalender",
      name: "Payment Reports",
    });
  }

  if (admin && admin.b2b === true) {
    menuItem.push({
      path: "/b2badd",
      name: "B2B",
      // icon: <FaThList />,
    });
  }

  if (admin && admin.community === true) {
    menuItem.push({
      path: "/community",
      name: "Community",
      // icon: <FaThList />,
    });
  }

  if (admin && admin.reports === true) {
    menuItem.push({
      path: "/reports",
      name: "Reports",
      // icon: <FaThList />,
    });
  }

  return (
    <div className="">
      <div className="col-md-12">
        <div style={{ width: isOpen ? "180px" : "80px" }} className="sidebar">
          <div className="top_section">
            <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
              Vijay Home Services
            </h1>
          </div>
          {menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link">
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      {/* <div className="col-md-12">
        <main style={{ width: "-webkit-fill-available" }}>{children}</main>
      </div> */}
    </div>
  );
};

export default Sidebar;
