import React, { useState, useEffect } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import Header from "../components/layout/Header";
import axios from "axios";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import Quotefollowupnav from "./Quotefollowupnav";
import { useNavigate } from "react-router-dom";

function Quotefollowup() {
  const [quoteflwdata, setquoteflwdata] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;
  const [categorydata, setcategorydata] = useState([]);
  const [category, setcategory] = useState([]);
  const admin = JSON.parse(sessionStorage.getItem("admin"));

  useEffect(() => {
    getcategory();
  }, []);

  useEffect(() => {
    postallajob();
  }, [category]);

  const postallajob = async () => {
    let res = await axios.post(apiURL + "/quotecategory", {
      category: category,
    });
    if (res.status === 200) {
      setquoteflwdata(res.data?.quotefollowup);
    }
  };

  const getcategory = async () => {
    let res = await axios.get(apiURL + "/getcategory");
    if (res.status === 200) {
      setcategorydata(res.data?.category);
    }
  };

  const localizer = momentLocalizer(moment);
  const navigate = useNavigate();

  const eventCounts = quoteflwdata.reduce((counts, item) => {
    const date = item.nxtfoll;
    counts[date] = (counts[date] || 0) + 1;
    return counts;
  }, {});

  const myEventsList = Object.keys(eventCounts).map((date) => ({
    title: `${eventCounts[date]} QuoteFollowups`,
    start: new Date(date),
    end: new Date(date),
    count: eventCounts[date],
  }));

  const handleSelectEvent = (event) => {
    const selectedDate = moment(event.start).format("YYYY-MM-DD");
    const selectedData = quoteflwdata.filter(
      (item) => item.date === selectedDate
    );
    console.log("selectedDatainsurveyCatagory", selectedData);
    navigate(`/quotedatatable/${selectedDate}/${category}`, {
      state: { data: selectedData },
    });
  };

  function calculateTotalCount(array) {
    let totalCount = 0;

    for (let i = 0; i < array.length; i++) {
      if (array[i].hasOwnProperty("nxtfoll")) {
        totalCount++;
      }
    }

    return totalCount;
  }

  const totalCount = calculateTotalCount(quoteflwdata);
  return (
    <div className="web">
      <Header />
      <Quotefollowupnav />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">Category</div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcategory(e.target.value)}
                      >
                        <option>-select-</option>
                        {admin?.category.map((category, index) => (
                          <option key={index} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div style={{ width: "94%", margin: "3%" }}>
            <Calendar
              localizer={localizer}
              events={myEventsList}
              startAccessor="start"
              endAccessor="end"
              selectable
              onSelectEvent={handleSelectEvent}
              style={{ height: 500 }}
            />
            <br />
            <div
              style={{
                backgroundColor: "rgb(169, 4, 46)",
                textAlign: "center",
              }}
            >
              <p class="header-text">Quote Followup - {totalCount} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Quotefollowup;
