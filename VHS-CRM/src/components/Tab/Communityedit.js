import React, { useState } from "react";
import Header from "../layout/Header";
import { Link } from "react-router-dom";

function Communityedit() {
  const [selected, setSelected] = useState(0);
  const handleClick = (divNum) => () => {
    setSelected(divNum);
  };
  return (
    <div className="row">
      <Header />

      <div className="row m-auto mt-2">
        <div className="col-md-12">
          <div className="card sticky">
            <div className="card-body">
              <div>1 Community add</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="d-flex float-end pt-3">
            <Link to="/community">
              <button
                className="btn-primary-button mx-2"
                onClick={handleClick(1)}
              >
                1 Community Add
              </button>
            </Link>

            <Link to="/community">
              <button onClick={handleClick(0)} className="btn-secondary-button">
                1 Community View
              </button>
            </Link>
          </div>
          <div className="card" style={{ marginTop: "62px" }}>
            <div className="card-body p-4">
              <form>
                <div className="row">
                  <div className="vhs-sub-heading">Company Details</div>
                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label">Appartment Name</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label"> Contact No</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        placeholder="1"
                        disabled={true}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label">Email ID</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                      />
                    </div>
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="vhs-sub-heading">Contact Details</div>
                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label">Contact Person</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        placeholder="test"
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label">1 Community</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                      />
                    </div>
                  </div>

                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label">Percentage</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                      />
                    </div>
                  </div>

                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label"> Project Manager</div>
                    <div className="group pt-1">
                      <select className="col-md-12 vhs-input-value">
                        <option>--select--</option>
                        <option>Abhay</option>
                        <option>Anil</option>
                        <option>Baskar Vhs Bangalore</option>
                        <option>Farooq</option>
                        <option>Mr.abinish Kumar</option>
                        <option>Mr.ravish</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="vhs-sub-heading">Login Details</div>
                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label">
                      Login
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        placeholder="promo"
                        disabled={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="row pt-3 justify-content-center">
                  <div className="col-md-2">
                    <button className="vhs-button">Save</button>
                  </div>
                  <div className="col-md-2">
                    <button className="vhs-button mx-3">Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Communityedit;
