import React from "react";
import Header from "./layout/Header";
import Customersernav from "./Customersernav";
import Table from "react-bootstrap/Table";

function Cservices() {
  return (
    <div className="web">
      <Header />
      <Customersernav />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="mt-2 p-3">
            <h5>Service Reminders</h5>

            <table class="table table-hover table-bordered mt-1">
              <thead>
                <tr className="tr clr table-secondary">
                  <th>Sr</th>
                  <th>Product</th>
                  <th>Service Count</th>
                  <th>Next service date </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>

          <div className="mt-2 p-3">
            <h5>Service & Complaint Details</h5>

            <table class="table table-hover table-bordered mt-1">
              <thead>
                <tr className="tr clr table-secondary">
                  <th>#</th>
                  <th>Cr. Date</th>
                  <th>Time </th>
                  <th>Job Category</th>
                  <th>Complaint</th>
                  <th>Technician</th>
                  <th>Status</th>
                  <th>Amt Received</th>
                  <th>Technician Comment</th>
                  <th>Sign IN</th>
                  <th>Sign OUT</th>
                  <th>Complete</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cservices;
