import React, { useState } from "react";
import Header from "../layout/Header";
import { Link } from "react-router-dom";

function Communitypassword() {
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
              <div>1 Community > Change Password</div>
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
                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label">
                      Login <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1 vhs-non-editable">Promo</div>
                  </div>
                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label">
                      Old Password
                      <span className="text-danger"> *</span>
                    </div>
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
                    <div className="vhs-input-label">
                      Password
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                      />
                    </div>
                  </div>

                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label">
                      Confirm Password
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
export default Communitypassword;
