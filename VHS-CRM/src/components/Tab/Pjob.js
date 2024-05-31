import React from "react";

function Pjob() {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card" style={{ marginTop: "30px" }}>
          <div className="card-body p-3">
            <form>
              <div className="row">
                <div className="col-md-4">
                  <div className="vhs-input-label">
                    Material <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <select className="col-md-12 vhs-input-value">
                      <option>--select--</option>
                      <open>Ace Emulsion</open>
                      <open>Air Care VG (Nippon)</open>
                      <open>Apex Emultion</open>
                    </select>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="vhs-input-label">
                    Benefits <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <textarea
                      rows={5}
                      cols={10}
                      className="col-md-12 vhs-input-value"
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="vhs-input-label">
                    Rate <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <input type="text" className="vhs-input-value col-md-12" />
                  </div>
                </div>
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
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </span>{" "}
          of 4
        </div>{" "}
        <table class="table table-hover table-bordered mt-2">
          <thead className="">
            <tr>
              <th style={{ width: "10%" }} scope="col">
                <input type="text" className="vhs-table-input" />
              </th>
              <th style={{ width: "20%" }} scope="col">
                <input type="text" className="vhs-table-input" />
              </th>
              <th style={{ width: "50%" }} scope="col">
                <input type="text" className="vhs-table-input" />
              </th>
              <th style={{ width: "10%" }} scope="col">
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
              <th style={{ width: "20%" }} className="table-head" scope="col">
                Material
              </th>
              <th style={{ width: "50%" }} className="table-head" scope="col">
                Description
              </th>
              <th style={{ width: "10%" }} className="table-head" scope="col">
                Rate
              </th>
              <th style={{ width: "10%" }} className="table-head" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="user-tbale-body">
              <td className="text-center">1</td>
              <td> Tractor Emulsion</td>
              <td>
                2 Coats Of Putty + Wall Sanding +1 Coat Of Primer & 2 Coats Of
                Asian Paints Tractor Emulsion
              </td>
              <td>20.00</td>
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
              <td>Tractor Emulsion</td>
              <td>
                {" "}
                Touchup Putty + Wall Sanding + 1 Coat Of Primer & 2 Coats Of
                Asian Paints Tractor Emulsion
              </td>
              <td>13.00</td>
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
              <td>Tractor Emulsion</td>
              <td>
                Touchup Putty + Wall Sanding + 2 Coats Of Asian Paints Tractor
                Emulsion
              </td>
              <td>9.00</td>
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
              <td> Tractor Emulsion</td>
              <td>
                Touchup Putty + Wall Sanding + 2 Coats Of Asian Paints Tractor
                Emulsion
              </td>
              <td>9.00</td>
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
              <td> Apcolite Advanced Heavy Duty Emulsion</td>
              <td>
                2 Coats Of Putty + Wall Sanding + 1 Coat Of Primer & 2 Coats Of
                Asian Paints Apcolite Advanced Emulsion.
              </td>
              <td>29.00</td>
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

export default Pjob;
