import React from "react";

function Item() {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card" style={{ marginTop: "30px" }}>
          <div className="card-body p-3">
            <form>
              <div className="row">
                <div className="col-md-4">
                  <div className="vhs-input-label">
                    Item Group <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <select className="col-md-12 vhs-input-value">
                      <option>--Select--</option>
                      <option>Bathroom Cleaning</option>
                      <option>Kitchen Cleaning</option>
                      <option>Painting</option>
                      <option>Sofa Cleaning</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-4"></div>

                <div className="col-md-4"></div>
              </div>

              <div className="row pt-3">
                <div className="vhs-sub-heading">Quantity</div>
                <div className="col-md-4 pt-3">
                  <div className="group pt-1">
                    <input type="text" className="col-md-12 vhs-input-value" />
                  </div>
                </div>

                <div className="col-md-4 pt-3">
                  <div className="group pt-1">
                    <input type="text" className="col-md-12 vhs-input-value" />
                  </div>
                </div>

                <div className="col-md-4 pt-3">
                  <div className="group pt-1">
                    <input type="text" className="col-md-12 vhs-input-value" />
                  </div>
                </div>
              </div>

              <div className="row pt-2">
                <div className="col-md-4 pt-3">
                  <div className="group pt-1">
                    <input type="text" className="col-md-12 vhs-input-value" />
                  </div>
                </div>

                <div className="col-md-4 pt-3">
                  <div className="group pt-1">
                    <input type="text" className="col-md-12 vhs-input-value" />
                  </div>
                </div>

                <div className="col-md-4 pt-3"></div>
              </div>

              <div className="row pt-3">
                <div className="vhs-sub-heading">Amount</div>
                <div className="col-md-4 pt-3">
                  <div className="group pt-1">
                    <input type="text" className="col-md-12 vhs-input-value" />
                  </div>
                </div>

                <div className="col-md-4 pt-3">
                  <div className="group pt-1">
                    <input type="text" className="col-md-12 vhs-input-value" />
                  </div>
                </div>

                <div className="col-md-4 pt-3">
                  <div className="group pt-1">
                    <input type="text" className="col-md-12 vhs-input-value" />
                  </div>
                </div>
              </div>

              <div className="row pt-2">
                <div className="col-md-4 pt-3">
                  <div className="group pt-1">
                    <input type="text" className="col-md-12 vhs-input-value" />
                  </div>
                </div>

                <div className="col-md-4 pt-3">
                  <div className="group pt-1">
                    <input type="text" className="col-md-12 vhs-input-value" />
                  </div>
                </div>

                <div className="col-md-4 pt-3"></div>
              </div>

              <div className="row pt-3 justify-content-center">
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
              <th style={{ width: "40%" }} scope="col">
                <input type="text" className="vhs-table-input" />
              </th>

              <th style={{ width: "20%" }} scope="col">
                <input type="text" className="vhs-table-input" />
              </th>
              <th style={{ width: "20%" }} scope="col">
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
              <th style={{ width: "40%" }} className="table-head" scope="col">
                Item Group
              </th>
              <th style={{ width: "20%" }} className="table-head" scope="col">
                Quantity
              </th>

              <th style={{ width: "20%" }} className="table-head" scope="col">
                Amount
              </th>
              <th style={{ width: "10%" }} className="table-head" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="user-tbale-body">
              <td className="text-center">1</td>
              <td> Bathroom Cleaning</td>
              <td>1 Nos</td>
              <td>400.00</td>

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
              <td> Bathroom Cleaning</td>
              <td>3 Nos</td>
              <td>400.00</td>

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
              <td> Kitchen Cleaning</td>
              <td>1 No</td>
              <td>1000.00</td>

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
              <td>Occupied Flat Cleaning</td>
              <td>1 bhk</td>
              <td>2400.00</td>

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
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>{" "}
      </div>
    </div>
  );
}

export default Item;
