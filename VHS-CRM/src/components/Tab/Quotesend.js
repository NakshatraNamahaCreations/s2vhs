import React from "react";
import Header from "../layout/Header";
import Quotefollowupnav from "../Quotefollowupnav";

function Quotesend() {
  return (
    <div>
      <Header />
      <Quotefollowupnav />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "32px" }}>
            <div className="card-body p-4">
              <form>
                <div className="row pt-2">
                  <div className="vhs-sub-heading">Search Template</div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">City</div>
                    <div className="group pt-1">
                      <select className="col-md-12 vhs-input-value">
                        <option>--select--</option>
                        <option>Ahmedabad</option>
                        <option>Bangalore</option>
                        <option>Bengaluru</option>
                        <option>Chennai</option>
                        <option>Kochi</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      B2B Type <span className="text-danger"> *</span>{" "}
                    </div>
                    <div className="group pt-1">
                      <select className="col-md-12 vhs-input-value">
                        <option>--select--</option>
                        <option>Apartment Housekeeping</option>
                        <option>Apartment pest control</option>
                        <option>General</option>
                        <option>Bathroom cleaning</option>
                        <option>General</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 pt-3"></div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-3">
                    <div className="vhs-input-label">
                      Service Type <span className="text-danger"> *</span>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        WhatsApp
                      </label>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        Email
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row pt-3 justify-content-center">
                  <div className="col-md-2">
                    <button className="vhs-button">Save</button>
                  </div>
                  {/* <div className="col-md-2">
              <button className="vhs-button mx-3">Cancel</button>
            </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quotesend;
