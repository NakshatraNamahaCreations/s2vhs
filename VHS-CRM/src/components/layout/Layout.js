import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ childern }) {
  return (
    <div>
      <Header />
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">{childern}</div>
      </div>
    </div>
  );
}

export default Layout;
