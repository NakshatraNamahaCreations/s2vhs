import React from "react";
import Header from "../layout/Header";
import Customernav from "../Customernav";

function Customerschedule() {
  return (
    <div>
      <Header />
      <Customernav />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="text-center scedule-border">
            TEMPLATE SENT TODAY AT 10AM.
          </div>
          <table class="table table-hover table-bordered mt-4">
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
                <th scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>
              </tr>

              <tr className="table-secondary">
                <th className="table-head" scope="col">
                  Sr
                </th>
                <th className="table-head" scope="col">
                  Customer Name
                </th>
                <th className="table-head" scope="col">
                  Address
                </th>
                <th className="table-head" scope="col">
                  City
                </th>
                <th className="table-head" scope="col">
                  Customer Type
                </th>
                <th className="table-head" scope="col">
                  Approach
                </th>
                <th className="table-head" scope="col">
                  Template Name
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="user-tbale-body">
                <td className="text-center">1</td>
                <td>
                  <div>
                    Akshay Dongre{" "}
                    <span>
                      <br />
                      (Akshay Dongre)
                    </span>
                  </div>
                  <div className="pt-3">
                    9850406557
                    <br /> Akshay.V.Dongre@Gmail.Com
                  </div>
                </td>
                <td>
                  {" "}
                  Megapolis Mystic (New)Address: Plot R1/1 To R1/4, Phase-III,
                  Rajiv Gandhi Infotech Park HinjawadiCity: PuneState:
                  MAHARASHTRACountry: IndiaZip: 411057Flat: B-305
                </td>
                <td>Pune </td>
                <td> General</td>
                <td>Adda </td>
                <td>
                  <div style={{ color: "black", fontWeight: "bold" }}>
                    Email
                  </div>
                  <div className="pt-3">
                    Vijay Home Services : To Help You Get Rid Of All Kinds Of
                    Pests In Your Home?
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
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>{" "}
        </div>
      </div>
    </div>
  );
}

export default Customerschedule;
