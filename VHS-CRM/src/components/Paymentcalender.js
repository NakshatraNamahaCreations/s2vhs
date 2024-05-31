import { Scheduler } from "@aldabil/react-scheduler";
import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import size from "react-element-popper/animations/size";
import axios from "axios";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "react-multi-date-picker/styles/colors/purple.css"
import DatePicker, { DateObject } from "react-multi-date-picker";

function Paymentcalender() {

  const defaultFromDate = new DateObject().subtract(4, "days");
  const defaultToDate = new DateObject().add(4, "days");

  const [values, setValues] = useState([defaultFromDate, defaultToDate]);


  const fromDate = values[0] || defaultFromDate;
  const toDate = values[1] || defaultToDate;

  console.log("From Date:", moment(fromDate.toDate()).format("YYYY-MM-DD"));
  console.log("To Date:", moment(toDate.toDate()).format("YYYY-MM-DD"));


  const apiURL = process.env.REACT_APP_API_URL;
  const [totalservice, settotalservice] = useState(0);

  const localizer = momentLocalizer(moment);
  const [view, setView] = React.useState("month"); // The current view of the calendar

  const navigate = useNavigate();

  const [dsrdata, setdsrdata] = useState([]);

  const [totalCount, setTotalCount] = useState(0);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const currentMonth = moment().month() + 1; // Get the current month (1-12)

    const initialFilteredData = dsrdata.filter((item) => {
      return item.dividedamtDates.some((date) => {
        const month = moment(date.date).month() + 1;
        return month === currentMonth;
      });
    });

    let count = 0;
    initialFilteredData.forEach((item) => {
      count += item.dividedamtDates.length;
    });

    setTotalCount(count);
    setFilteredData(initialFilteredData);
  }, [dsrdata]); // Trigger the effect whenever the data changes

  const handleViewChange = (newView) => {
    setView(newView);
  };

  // Get the current date
  const currentDate = new Date();

  // Get the start of the current month
  const startOfMonth = moment(currentDate)
    .startOf("month")
    .format("YYYY-MM-DD");

  // Get the end of the current month
  const endOfMonth = moment(currentDate).endOf("month").format("YYYY-MM-DD");

  const [rstart, setrstart] = useState(startOfMonth);
  const [rend, setrend] = useState(endOfMonth);

  const handleRangeChange = (range) => {
    const targetMonth = range.start.getMonth() + 1;

    const newFilteredData = dsrdata.filter((item) => {
      return item.dividedamtDates.some((date) => {
        const month = moment(date.date).month() + 1;
        return month === targetMonth;
      });
    });

    let count = 0;
    newFilteredData.forEach((item) => {
      count += item.dividedamtDates.length;
    });

    setTotalCount(count);
    setFilteredData(newFilteredData);
    const convertedsDate = moment(range.start).format("YYYY-MM-DD");
    const convertedeDate = moment(range.end).format("YYYY-MM-DD");

    setrstart(convertedsDate);
    setrend(convertedeDate);
  };



  useEffect(() => {
    getAlldsr();
  }, [rstart]);

  const getAlldsr = async () => {
    try {
      let res = await axios.post(apiURL + "/getPaymentcalenderlist", {
        startDate: rstart,
        endDate: rend,
      });

      if (res.status === 200) {
        setdsrdata(res.data.dividedamtDates);
      }
    } catch (error) { }
  };

  const eventCounts = dsrdata.reduce((counts, item) => {
    const newdates = item.dividedamtDates;

    newdates.forEach((newdate) => {
      const formattedDate = moment(newdate.date).format("YYYY-MM-DD");

      counts[formattedDate] = (counts[formattedDate] || 0) + 1;
    });

    return counts;
  }, {});

  const myEventsList = Object.keys(eventCounts).map((date) => ({
    title: `${eventCounts[date]} Payments`,
    start: new Date(date),
    end: new Date(date),
    count: eventCounts[date],
  }));

  const handleSelectEvent = (event) => {
    const selectedDate = moment(event.start).format("YYYY-MM-DD");
    const selectedData = dsrdata.filter((item) => item.dividedamtDates);

    const url = `/paymentfilterlist/${selectedDate}`;
    const newState = { data: selectedData };

    // Open link in a new tab
    const newTab = window.open(url, "_blank");
    newTab.location && newTab.location.reload(); // Optional: Reload the new tab with the provided URL

    // You can also pass state to the new tab using sessionStorage or localStorage and access it in the new tab if needed
    sessionStorage.setItem("newTabState", JSON.stringify(newState));
  };

  return (
    <div className="web">
      <Header />
      {/* <DSRnav /> */}

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="p-3" style={{ justifyContent: "space-between", display: "flex" }}>
            <h4>Payment Reports</h4>
            {/* <div style={{ display: "grid" }}>

              <DatePicker
                value={values}
                onChange={setValues}
                range
                animations={[size()]}
                className="yellow"
                style={{
                  backgroundColor: "#86b7fe",
                  height: "24px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  padding: "15px 20px",
                  color: "black"
                }}
              />
              <button style={{
                marginTop: " 10px",
                borderRadius: "5px",
                border: "none",
                background: "#ffc107"
              }}>Search</button>
            </div> */}
          </div>


          <div style={{ width: "100%", margin: "3%", }}>
            <Calendar
              localizer={localizer}
              events={myEventsList}
              onView={handleViewChange}
              startAccessor="start"
              endAccessor="end"
              selectable
              onSelectEvent={handleSelectEvent}
              onRangeChange={handleRangeChange}
              style={{ height: 500 }}
            />
            <br />
            <div
              style={{
                backgroundColor: "rgb(169, 4, 46)",
                textAlign: "center",
              }}
            >
              <p class="header-text">Payment-Reports - {totalCount} </p>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
export default Paymentcalender;
