import React from "react";

function Area() {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card" style={{ marginTop: "30px" }}>
          <div className="card-body p-3">
            <form>
              <div className="row">
                <div className="col-md-4">
                  <div className="vhs-input-label">
                    Area Type <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <input type="text" className="col-md-12 vhs-input-value" />
                  </div>
                </div>

                <div className="col-md-4"></div>

                <div className="col-md-4"></div>
              </div>

              <div className="row pt-3">
                <div className="col-md-2">
                  <button className="vhs-button">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-5">
          Page{" "}
          <span>
            <select className="vh-user-select">
              <option>1</option>
            </select>
          </span>{" "}
          of 1
        </div>{" "}
        <table class="table table-hover table-bordered mt-2">
          <thead className="">
            <tr>
              <th style={{ width: "10%" }} scope="col">
                <input type="text" className="vhs-table-input" />
              </th>
              <th style={{ width: "80%" }} scope="col">
                <input type="text" className="vhs-table-input" />
              </th>

              <th style={{ width: "10%" }} scope="col">
                <input type="text" className="vhs-table-input" />
              </th>
            </tr>

            <tr className="table-secondary">
              <th style={{ width: "10%" }} className="table-head" scope="col">
                Sr
              </th>
              <th style={{ width: "80%" }} className="table-head" scope="col">
                Area Type
              </th>
              <th style={{ width: "10%" }} className="table-head" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="user-tbale-body">
              <td className="text-center">1</td>
              <td> A F Station Yelahanka 560063</td>

              <td>
                <div className="d-flex">
                  <a href="#" className="hyperlink">
                    Edit
                  </a>

                  <span className="mx-2">|</span>

                  <a href="#" className="hyperlink mx-1">
                    Delete
                  </a>
                </div>
              </td>
            </tr>

            <tr className="user-tbale-body">
              <td className="text-center">2</td>
              <td> Adugodi 560030</td>

              <td>
                <div className="d-flex">
                  <a href="#" className="hyperlink">
                    Edit
                  </a>

                  <span className="mx-2">|</span>

                  <a href="#" className="hyperlink mx-1">
                    Delete
                  </a>
                </div>
              </td>
            </tr>

            <tr className="user-tbale-body">
              <td className="text-center">3</td>
              <td>Agara 560034</td>

              <td>
                <div className="d-flex">
                  <a href="#" className="hyperlink">
                    Edit
                  </a>

                  <span className="mx-2">|</span>

                  <a href="#" className="hyperlink mx-1">
                    Delete
                  </a>
                </div>
              </td>
            </tr>

            <tr className="user-tbale-body">
              <td className="text-center">4</td>
              <td>Agram 560007</td>

              <td>
                <div className="d-flex">
                  <a href="#" className="hyperlink">
                    Edit
                  </a>

                  <span className="mx-2">|</span>

                  <a href="#" className="hyperlink mx-1">
                    Delete
                  </a>
                </div>
              </td>
            </tr>

            <tr className="user-tbale-body">
              <td className="text-center">5</td>
              <td>Air Force Hospital 560007</td>

              <td>
                <div className="d-flex">
                  <a href="#" className="hyperlink">
                    Edit
                  </a>

                  <span className="mx-2">|</span>

                  <a href="#" className="hyperlink mx-1">
                    Delete
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

export default Area;
