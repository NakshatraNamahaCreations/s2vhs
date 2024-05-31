import React from "react";
import moment from "moment";
import axios from "axios";

function Header() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const apiURL = process.env.REACT_APP_API_URL;
  const signout = () => {
    try {
      axios
        .post(apiURL+`/master/logout/` + admin._id)
        .then(function (res) {
          if (res.status === 200) {
            sessionStorage.removeItem("admin");
            alert("Signout Success!");
            window.location.assign("/");
            return;
          } else {
            alert("Signout Unsuccessfully");
            return;
          }
        });
    } catch (error) {
      console.warn(error);
      alert("Signout Unsuccessfully");
    }
  };

  return (
    <div>
      <div
        className="row"
        style={{
          backgroundColor: "#A9042E",
          height: "42px",
          // width: "100%",
          marginLeft: "0px",
          //   max-width: "-webkit-fill-available";
        }}
      >
        <div className="col-md-4">
          <p className="header-text">{moment().format("LLLL")}</p>
        </div>
        <div className="col-md-4 text-center">
          <p className="header-text">VIJAY HOME SERVICES</p>
        </div>
        <div className="col-md-4" style={{ textAlign: "end" }}>
          <p className="header-text">
            {" "}
            {admin?.displayname} | Change Password |{" "}
            <span style={{ cursor: "pointer" }} onClick={signout}>
              {" "}
              Logout
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
