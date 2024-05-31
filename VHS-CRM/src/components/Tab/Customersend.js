import React from "react";
import Header from "../layout/Header";
import Customernav from "../Customernav";

function Customersend() {
  return (
    <div>
      <Header />
      <Customernav />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "32px" }}>
            <div className="card-body p-4">
              <form>
                <div className="row  pt-2">
                  <div className="col-md-5">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="vhs-input-label">
                          Customer Type
                          <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <select className="col-md-12 vhs-input-value">
                            <option>--select--</option>
                            <option>Builder</option>
                            <option>Company</option>
                            <option>Construction Company</option>
                            <option>Farm House</option>
                            <option>Flat</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-12" style={{ marginTop: "60px" }}>
                        <div className="vhs-input-label">
                          Template ID
                          <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            className="col-md-12 vhs-input-value"
                            placeholder="1384993939894949"
                          />
                        </div>
                      </div>

                      <div
                        style={{
                          color: "black",
                          fontSize: "12px",
                          fontWeight: "bold",
                          textAlign: "center",
                          marginTop: "50px",
                        }}
                      >
                        Don't Change Sms Text Except #Var#
                      </div>

                      <div className="col-md-12" style={{ marginTop: "50px" }}>
                        <div className="vhs-input-label">SMS Template</div>
                        <div className="group pt-1">
                          <textarea
                            className="col-md-12 vhs-input-value"
                            rows={4}
                            cols={6}
                            placeholder="dear #var# 
thanking you for placing request with us, our manger will connect you shortly to give you brief explanation about services &amp; prices, we are india's leading home services company, 
thank you 
www.vijayhomeservices.com 
india support : 8453748478"
                          />
                        </div>
                      </div>

                      <div
                        className="row   justify-content-center"
                        style={{ gap: "80px", marginTop: "80px" }}
                      >
                        <div className="col-md-2">
                          <button className="vhs-button">Save</button>
                        </div>
                        <div className="col-md-2">
                          <button className="vhs-button">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div>
                      <div className="d-flex">
                        <div className="vhs-sub-heading">
                          Quotation Sent P - 1707163437086044451
                        </div>
                        <div className="copy-botton">Copy</div>
                      </div>

                      <div className="vhs-desc pt-3 text-left">
                        Dear #Customer Name# Iam #Executive Name# From Vijay
                        Home Services. Thank U For Giving Us Opportunity To
                        Visit The Property And Update You The Cost For Your
                        Painting Requirement. Hope I Was Helpful Update All Your
                        Queries Upto Satisfaction Level, Please Click On The
                        Below Link To View The Quotation . #Quotation Link# We
                        Will Be Glad To Beautify Your House With Our Painting
                        Expertise. Thanking You, Www.Vijayhomeservices.Com
                      </div>
                    </div>

                    <div className="pt-3">
                      <div className="d-flex">
                        <div className="vhs-sub-heading">
                          Quotation Sent P - 1707163437086044451
                        </div>
                        <div className="copy-botton">Copy</div>
                      </div>

                      <div className="vhs-desc pt-3 text-left">
                        Dear #Customer Name# Iam #Executive Name# From Vijay
                        Home Services. Thank U For Giving Us Opportunity To
                        Visit The Property And Update You The Cost For Your
                        Painting Requirement. Hope I Was Helpful Update All Your
                        Queries Upto Satisfaction Level, Please Click On The
                        Below Link To View The Quotation . #Quotation Link# We
                        Will Be Glad To Beautify Your House With Our Painting
                        Expertise. Thanking You, Www.Vijayhomeservices.Com
                      </div>
                    </div>

                    <div className="pt-3">
                      <div className="d-flex">
                        <div className="vhs-sub-heading">
                          Quotation Sent P - 1707163437086044451
                        </div>
                        <div className="copy-botton">Copy</div>
                      </div>

                      <div className="vhs-desc pt-3 text-left">
                        Dear #Customer Name# Iam #Executive Name# From Vijay
                        Home Services. Thank U For Giving Us Opportunity To
                        Visit The Property And Update You The Cost For Your
                        Painting Requirement. Hope I Was Helpful Update All Your
                        Queries Upto Satisfaction Level, Please Click On The
                        Below Link To View The Quotation . #Quotation Link# We
                        Will Be Glad To Beautify Your House With Our Painting
                        Expertise. Thanking You, Www.Vijayhomeservices.Com
                      </div>
                    </div>

                    <div className="pt-3">
                      <div className="d-flex">
                        <div className="vhs-sub-heading">
                          Quotation Sent P - 1707163437086044451
                        </div>
                        <div className="copy-botton">Copy</div>
                      </div>

                      <div className="vhs-desc pt-3 text-left">
                        Dear #Customer Name# Iam #Executive Name# From Vijay
                        Home Services. Thank U For Giving Us Opportunity To
                        Visit The Property And Update You The Cost For Your
                        Painting Requirement. Hope I Was Helpful Update All Your
                        Queries Upto Satisfaction Level, Please Click On The
                        Below Link To View The Quotation . #Quotation Link# We
                        Will Be Glad To Beautify Your House With Our Painting
                        Expertise. Thanking You, Www.Vijayhomeservices.Com
                      </div>
                    </div>
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

export default Customersend;
