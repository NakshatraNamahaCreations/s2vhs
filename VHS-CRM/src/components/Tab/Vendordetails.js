import React, { useState } from "react";
import Header from "../layout/Header";

const active = {
  backgroundColor: "rgb(169, 4, 46)",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
};
const inactive = { color: "black", backgroundColor: "white" };
function Vendordetails() {
  const [selected, setSelected] = useState(0);
  const handleClick = (divNum) => () => {
    setSelected(divNum);
  };
  return (
    <div className="row">
      <Header />

      <div className="row mt-2 m-auto">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="header-text1">
                Vendor Service Details > Salman Blr VV
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex float-end mt-3 mb-3">
          <button
            className="btn-primary-button mx-2"
            style={selected == 2 ? active : inactive}
            onClick={handleClick(2)}
          >
            Vendor Add
          </button>

          <button
            style={selected == 1 ? active : inactive}
            onClick={handleClick(1)}
            className="btn-secondary-button"
          >
            All Vendors
          </button>
          <button
            style={selected == 0 ? active : inactive}
            onClick={handleClick(0)}
            className="btn-secondary-button mx-2"
          >
            Services
          </button>
        </div>
      </div>

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body p-4">
              <div className="row">
                <div className="vhs-sub-heading pb-2">Vendor Details</div>
                <div className="col-md-4">
                  <div className="vhs-input-label">Vendor Name</div>
                  <div className="group pt-1 vhs-non-editable">
                    SALMAN BLR VV
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="vhs-input-label">Contact Person</div>
                  <div className="group pt-1 vhs-non-editable">Salman</div>
                </div>
                <div className="col-md-4">
                  <div className="vhs-input-label">Mobile No.</div>
                  <div className="group pt-1 vhs-non-editable">99867565</div>
                </div>
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Email ID</div>
                  <div className="group pt-1 vhs-non-editable">NA</div>
                </div>

                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">GST Id</div>
                  <div className="group pt-1 vhs-non-editable"></div>
                </div>

                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Address</div>
                  <div className="group pt-1 vhs-non-editable">
                    BOMMENAHALLI , BOMMENHALLI , BANGALORE
                  </div>
                </div>

                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label"> Instruction</div>
                  <div className="group pt-1 vhs-non-editable"></div>
                </div>
              </div>

              <div className="row m-auto pt-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="vhs-sub-heading " for="flexCheckDefault">
                    Bathroom Cleaning
                  </label>
                </div>

                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Qty ( 1 Nos ) >(Amount)</div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      placeholder="400"
                      className="col-md-12 vhs-input-value"
                    />
                  </div>
                </div>

                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">
                    {" "}
                    Qty ( 1 Nos ) > (Remark)
                  </div>
                  <div className="group pt-1">
                    <textarea
                      rows={6}
                      cols={4}
                      className="col-md-12 vhs-input-value"
                    />
                  </div>
                </div>

                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Qty ( 2 Nos ) >(Amount)</div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      placeholder="400"
                      className="col-md-12 vhs-input-value"
                    />
                  </div>
                </div>

                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">
                    {" "}
                    Qty ( 2 Nos ) > (Remark)
                  </div>
                  <div className="group pt-1">
                    <textarea
                      rows={6}
                      cols={4}
                      className="col-md-12 vhs-input-value"
                    />
                  </div>
                </div>

                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Qty ( 3 Nos ) >(Amount)</div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      placeholder="400"
                      className="col-md-12 vhs-input-value"
                    />
                  </div>
                </div>

                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">
                    {" "}
                    Qty ( 3 Nos ) > (Remark)
                  </div>
                  <div className="group pt-1">
                    <textarea
                      rows={6}
                      cols={4}
                      className="col-md-12 vhs-input-value"
                    />
                  </div>
                </div>
              </div>

              <div className="row m-auto pt-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="vhs-sub-heading " for="flexCheckDefault">
                    Kitchen Cleaning
                  </label>
                </div>

                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Qty ( 1 Nos ) >(Amount)</div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      placeholder="1000"
                      className="col-md-12 vhs-input-value"
                    />
                  </div>
                </div>

                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">
                    {" "}
                    Qty ( 1 Nos ) > (Remark)
                  </div>
                  <div className="group pt-1">
                    <textarea
                      rows={6}
                      cols={4}
                      className="col-md-12 vhs-input-value"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div class="form-check pt-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="vhs-sub-heading " for="flexCheckDefault">
                    Occupied Flat Cleaning
                  </label>
                </div>

                <div class="form-check pt-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="vhs-sub-heading " for="flexCheckDefault">
                    Bathroom CleaningPainting Services{" "}
                  </label>
                </div>

                <div class="form-check pt-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="vhs-sub-heading " for="flexCheckDefault">
                    Sofa Cleaning
                  </label>
                </div>
                <div class="form-check pt-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="vhs-sub-heading " for="flexCheckDefault">
                    Vacant House Cleaning
                  </label>
                </div>
              </div>

              <div className="row pt-3 ">
                <div className="col-md-2">
                  <button className="vhs-button">Save</button>
                </div>
                <div className="col-md-2">
                  <button className="vhs-button mx-3">Cancel</button>
                </div>
              </div>
            </div>
          </div>
          <table class="table table-hover table-bordered mt-3">
            <thead className="">
              <tr>
                <th scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>
                <th scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>
                <th scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>
                <th scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>
                <th scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>
                <th scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>
              </tr>

              <tr className="table-secondary">
                <th className="table-head" scope="col">
                  S.No
                </th>
                <th className="table-head" scope="col">
                  Service Name
                </th>
                <th className="table-head" scope="col">
                  Quantity
                </th>
                <th scope="col" className="table-head">
                  Amount
                </th>
                <th scope="col" className="table-head">
                  Remark
                </th>
                <th scope="col" className="table-head">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="user-tbale-body">
                <td>1</td>
                <td>Bathroom Cleaning</td>
                <td>1 Nos</td>
                <td>400</td>
                <td></td>
                <td className="text-center">
                  <i class="fa-solid fa-trash" style={{ color: "orange" }}></i>
                </td>
              </tr>
            </tbody>
          </table>{" "}
          <div className="text-center pt-3 pb-3">
            <button className="vhs-button">Print</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vendordetails;
