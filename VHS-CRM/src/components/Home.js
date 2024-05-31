import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

import Header from "./layout/Header";
import Nav from "./Nav1";
import axios from "axios";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import moment from "moment";


function Home() {
  const apiURL = process.env.REACT_APP_API_URL;
  const [customer, setCustomer] = useState();
  const [enquiry, setEnquiry] = useState();
  const [service, setService] = useState();
  const [enquiryFollowup, setEnquiryFollowup] = useState([]);
  
  const data01 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const data02 = [
    { name: "A1", value: 100 },
    { name: "A2", value: 300 },
    { name: "B1", value: 100 },
    { name: "B2", value: 80 },
    { name: "B3", value: 40 },
    { name: "B4", value: 30 },
    { name: "B5", value: 50 },
    { name: "C1", value: 100 },
    { name: "C2", value: 200 },
    { name: "D1", value: 150 },
    { name: "D2", value: 50 },
  ];
  const [state, setState] = useState({
    options: {
      colors: ["#8cd68cd1", "#ffc0cb"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Uttam Das",
          "Vendor",
          "Babu",
          "Bishwajit",
          "Nayan Hyd",
          "Pranjal Vendor",
          "Krishna",
          "Yahyia Alom",
          "Asmat Chennai",
          "Pranjal Hyd Vd",
          "Gopal",
          "Mahesh Beta",
          "ARJUN VHS",
          "Nima Vhs",
        ],
      },
    },
    series: [
      {
        name: "user",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: "vendor",
        data: [3, 60, 35, 80, 49, 70, 20, 81],
      },
    ],
  });

  const getCustomer = async () => {
    let res = await axios.get(apiURL + "/getcustomercount");
    if (res.status === 200) {
      setCustomer(res.data?.customers);
    }
  };
  const [thisweekenquiry, setthisweekenquiry] = useState()
  const getEnquiry = async () => {
    let res = await axios.get(apiURL + "/getallenquirycount");
    if (res.status === 200) {
      const today = res.data?.enquirycountToday;
      const thisweek = res.data?.enquirycountThisWeek;
      setEnquiry(today);
      setthisweekenquiry(thisweek);
    }
  };

  const getService = async () => {
    let res = await axios.get(apiURL + "/getallservicecount");
    if (res.status === 200) {
      setService(res.data?.servicecount);
    }
  };

  const getEnquiryFollowup = async () => {
    let res = await axios.get(apiURL + "/getcalllateraggredata");
    if (res.status === 200) {
      setEnquiryFollowup(res.data?.enquiryfollowup);
    }
  };

  useEffect(() => {
    getCustomer();
    getEnquiry();
    getService();
    getEnquiryFollowup();
  }, []);



  const enquiryFollowUpCurrentDateLength = enquiryFollowup.filter((item) =>
    moment(item.date, "MM-DD-YYYY").isSame(moment(), "day")
  );
  const enquiryFollowUpCallLater = enquiryFollowup.filter(
    (item) => item.response === "Call Later"
  );

  const enquiryFollowUpNotInterested = enquiryFollowup.filter(
    (item) => item.response === "Not Intrested"
  );

  
 





  return (
    <div className="web">
      <Header />

      <div className="row m-auto mt-3">
        <div className="col-md-3">
          <div className="card home-col">
            <div className="card-body">
              <div className="home-content">Services Details</div>
              <div className="home-desc">
                This Month service booked : <b>{service}</b>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card home-col">
            <div className="card-body">
              <div className="home-content">Service Reminder Details</div>
              <div className="home-desc">This Week : 1</div>
              <div className="home-desc">This Month This Month : 12</div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card home-col">
            <div className="card-body">
              <div className="home-content">Customer</div>
              <div className="home-desc">
                Total Customers :<b>{customer}</b>{" "}
              </div>
              {/* <div className="home-desc">This Month Due Amount : 1,13,129</div> */}
            </div>
          </div>
        </div>
        <div className="col-md-3 ">
          <div className="card home-col">
            <div className="card-body">
              <div className="home-content">Expiry Details</div>
              <div className="home-desc">This Week : 3</div>
              <div className="home-desc">This Month This Month : 25</div>
            </div>
          </div>
        </div>
      </div>
      <div className="row m-auto pt-3">
        <div className="col-md-3">
          <div className="card home-col">
            <div className="card-body">
              <div className="home-content">Enquiry</div>
              <div className="home-desc">
                Today : <b>{enquiry}</b>{" "}
              </div>
              <div className="home-desc">This Week : {thisweekenquiry}</div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card home-col">
            <div className="card-body">
              <div className="home-content">Positive</div>
              <div className="home-desc">Today : 5</div>
              <div className="home-desc">This Week : 5</div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card home-col">
            <div className="card-body">
              <div className="home-content">Call Later</div>
              <div className="home-desc">
                Today :<b>{enquiryFollowUpCallLater.length}</b>{" "}
              </div>
              <div className="home-desc">This Week : 5</div>
            </div>
          </div>
        </div>
        <div className="col-md-3 ">
          <div className="card home-col">
            <div className="card-body">
              <div className="home-content">Not Interested</div>
              <div className="home-desc">
                Today : <b>{enquiryFollowUpNotInterested.length} </b>{" "}
              </div>
              <div className="home-desc">This Week : 5</div>
            </div>
          </div>
        </div>
      </div>
      <div className="row m-auto pt-3">
        <div className="col-md-3">
          <div className="card home-col">
            <div className="card-body">
              <div className="home-content">Enquiry Followup</div>
              <div className="home-desc">
                Today :<b> {enquiryFollowUpCurrentDateLength.length}</b>{" "}
              </div>
              <div className="home-desc">This Week : 18</div>
            </div>
          </div>
        </div>

     

        <div className="col-md-3"></div>
        <div className="col-md-3 "></div>
      </div>

      <div className="row m-auto pt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="home-content pt-2">
                Technicianwise Call Details - Current Month
              </div>
              <Chart
                options={state.options}
                series={state.series}
                type="bar"
                width="500"
              />
              <div className="home-desc">
                <i>Calls (This Month)</i>
              </div>
              <div className="home-content1 text-left pt-2">
                Technicianwise Call Details - Current Month
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="home-content pt-2">
                Call This Month - Job Categorywise
              </div>
              <PieChart width={400} height={400}>
                <Pie
                  data={data01}
                  dataKey="value"
                  cx={200}
                  cy={200}
                  outerRadius={60}
                  fill="#8cd68cd1"
                />
                <Pie
                  data={data02}
                  dataKey="value"
                  cx={200}
                  cy={200}
                  innerRadius={70}
                  outerRadius={90}
                  fill="#ffc0cb"
                  label
                />
              </PieChart>
              <div className="home-content1 text-left pt-4">
                Call This Month - Job Categorywise - Apr 2023
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
