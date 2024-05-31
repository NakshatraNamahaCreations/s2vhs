import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Link } from "react-router-dom";

function UserEdit() {
  const [selected, setSelected] = useState(0);
  const handleClick = (divNum) => () => {
    setSelected(divNum);
  };
  return (
    <div className="web">
      <Header />

      {/* <div className="row m-auto">
        <div className="col-md-12">
          <div className="card mt-2">
            <div className="card-body">
              <div className="header-text1">Master > Add</div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="row pt-3 justify-content-end">
        <div className="col-md-1 p-0">
          <Link to="/master">
            <button
              className="btn-primary-button"
              //   style={selected == 1 ? active : inactive}
              onClick={handleClick(1)}
            >
              User Add
            </button>
          </Link>
        </div>

        <div className="col-md-1 p-0">
          <Link to="/user">
            <button
              //   style={selected == 0 ? active : inactive}
              onClick={handleClick(0)}
              className="btn-primary-button"
            >
              User View
            </button>
          </Link>
        </div>
      </div>

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "40px" }}>
            <div className="card-body p-4">
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">Display Name</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">Contact No</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Login
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
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

export default UserEdit;
