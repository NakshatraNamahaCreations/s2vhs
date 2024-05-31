import React from "react";

function Servicetype() {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card" style={{ marginTop: "30px" }}>
          <div className="card-body p-3">
            <div className="vhs-sub-heading pb-2">Add New Record</div>
            <form>
              <div className="row">
                <div className="col-md-4">
                  <div className="vhs-input-label">
                    Service Type <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <input type="text" className="col-md-12 vhs-input-value" />
                  </div>
                </div>
              </div>

              <div className="row pt-3">
                <div className="col-md-2">
                  <button className="vhs-button">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <table class="table table-hover table-bordered mt-5">
          <thead className="">
            <tr>
              <th style={{ width: "10%" }} scope="col">
                <input type="text" className="vhs-table-input" />
              </th>
              <th style={{ width: "45%" }} scope="col">
                <input type="text" className="vhs-table-input" />
              </th>
              <th style={{ width: "45%" }} scope="col">
                <input type="text" className="vhs-table-input" />
              </th>
            </tr>

            <tr className="table-secondary">
              <th style={{ width: "10%" }} className="table-head" scope="col">
                Sr
              </th>
              <th style={{ width: "45%" }} className="table-head" scope="col">
                Service Type
              </th>
              <th style={{ width: "45%" }} className="table-head" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="user-tbale-body">
              <td className="text-center">1</td>
              <td>
                <input
                  type="text"
                  placeholder="appliances repair"
                  className="table-input "
                />
              </td>
              <td>
                <div className="d-flex">
                  <a href="#" className="hyperlink">
                    Delete |
                  </a>
                  <a href="#" className="hyperlink mx-2">
                    Template
                  </a>
                </div>
              </td>
            </tr>

            <tr className="user-tbale-body">
              <td className="text-center">2</td>
              <td>
                <input
                  type="text"
                  placeholder="cleaning services"
                  className="table-input "
                />
              </td>
              <td>
                <div className="d-flex">
                  <a href="#" className="hyperlink">
                    Delete |
                  </a>
                  <a href="#" className="hyperlink mx-2">
                    Template <span>(Email:8)</span>
                  </a>
                </div>
              </td>
            </tr>

            <tr className="user-tbale-body">
              <td className="text-center">3</td>
              <td>
                <input
                  type="text"
                  placeholder="facility management"
                  className="table-input "
                />
              </td>
              <td>
                <div className="d-flex">
                  <a href="#" className="hyperlink">
                    Delete |
                  </a>
                  <a href="#" className="hyperlink mx-2">
                    Template
                  </a>
                </div>
              </td>
            </tr>

            <tr className="user-tbale-body">
              <td className="text-center">4</td>
              <td>
                <input
                  type="text"
                  placeholder="floor polishing"
                  className="table-input "
                />
              </td>
              <td>
                <div className="d-flex">
                  <a href="#" className="hyperlink">
                    Delete |
                  </a>
                  <a href="#" className="hyperlink mx-2">
                    Template
                  </a>
                </div>
              </td>
            </tr>

            <tr className="user-tbale-body">
              <td className="text-center">5</td>
              <td>
                <input
                  type="text"
                  placeholder="Hospital Cleaning"
                  className="table-input "
                />
              </td>
              <td>
                <div className="d-flex">
                  <a href="#" className="hyperlink">
                    Delete |
                  </a>
                  <a href="#" className="hyperlink mx-2">
                    Template <span>(Whatsapp:1,Email:8)</span>
                  </a>
                </div>
              </td>
            </tr>

            <tr
              className="user-tbale-body"
              style={{ backgroundColor: "#eee", height: "40px" }}
            >
              <td className="text-center"></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>{" "}
      </div>
    </div>
  );
}

export default Servicetype;
