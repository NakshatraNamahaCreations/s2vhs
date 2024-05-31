import React from "react";
import Header from "../layout/Header";
import Quotefollowupnav from "../Quotefollowupnav";

function Quotetemplate() {
  return (
    <div>
      <Header />
      <Quotefollowupnav />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "32px" }}>
            <div className="card-body p-4">
              <div
                style={{
                  color: "black",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                No Scheduled Template For Today
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quotetemplate;
