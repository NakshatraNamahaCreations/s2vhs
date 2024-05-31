import React from "react";
import Header from "./layout/Header";
import { Link } from "react-router-dom";

function Reports() {
  return (
    <div className="web">
      <Header />

      {/* <div className="row m-auto mt-2">
        <div className="col-md-12">
          <div className="card sticky">
            <div className="card-body">
              <div>MIS Report > Category</div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="row m-auto mt-3">
        <div className="col-md-3">
          <Link to="/report/catagory">
            <div className="card home-col">
              <div className="card-body">
                <div className="home-content">Category</div>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/report/dsr">
            <div className="card home-col">
              <div className="card-body">
                <div className="home-content">DSR</div>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/report/enquiry">
            <div className="card home-col">
              <div className="card-body">
                <div className="home-content">Enquiry Report</div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3 ">
          <Link to="/report/survey">
            <div className="card home-col">
              <div className="card-body">
                <div className="home-content">Survey</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="row m-auto pt-3">
        <div className="col-md-3">
          <Link to="/report/quotation">
            <div className="card home-col">
              <div className="card-body">
                <div className="home-content">Quotation</div>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/report/runningprojects">
            <div className="card home-col">
              <div className="card-body">
                <div className="home-content">Running Projects</div>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/report/closedp">
            <div className="card home-col">
              <div className="card-body">
                <div className="home-content">Closed Projects</div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3  mb-4">
          <Link to="/report/b2b">
            <div className="card home-col">
              <div className="card-body">
                <div className="home-content">B2B</div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3 "></div>
      </div>
      <div className="row m-auto">
      <div className="col-md-3">
          <Link to="/report/payments">
            <div className="card home-col">
              <div className="card-body">
                <div className="home-content">Payment Reports</div>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3"></div>

        <div className="col-md-3"></div>
        <div className="col-md-3 "></div>
      </div>
    </div>
  );
}

export default Reports;