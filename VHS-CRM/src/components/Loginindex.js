import { Outlet } from "react-router-dom";
import React from "react";
import Sidebar from "./layout/Sidebar";

function Loginindex() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Loginindex;
