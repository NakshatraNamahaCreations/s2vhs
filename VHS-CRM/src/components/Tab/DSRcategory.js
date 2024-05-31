import { Scheduler } from "@aldabil/react-scheduler";
import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import DSRnav from "../DSRnav";
import axios from "axios";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function DSRcategory() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const apiURL = process.env.REACT_APP_API_URL;
  const [categorydata, setcategorydata] = useState([]);
  const [dCategory, setcategory] = useState("");
  const localizer = momentLocalizer(moment);
  const [view, setView] = React.useState("month");
  const navigate = useNavigate();

  const [dsrnewdata, setdsrnewdata] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const currentMonth = moment().month() + 1; // Get the current month (1-12)

    const initialFilteredData = dsrnewdata.filter((item) => {
      return item.dividedDates.some((date) => {
        const month = moment(date.date).month() + 1;
        return month === currentMonth;
      });
    });

    let count = 0;

    initialFilteredData.forEach((item) => {

      count += item.dividedDates.length;
    });






    setTotalCount(count);
    setFilteredData(initialFilteredData);
  }, [dsrnewdata]); // Trigger the effect whenever the data changes

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

    const newFilteredData = dsrnewdata.filter((item) => {
      return item.dividedDates.some((date) => {
        const month = moment(date.date).month() + 1;
        return month === targetMonth;
      });
    });

    let count = 0;
    newFilteredData.forEach((item) => {
      count += item.dividedDates.length;
    });

    setTotalCount(count);
    setFilteredData(newFilteredData);
    const convertedsDate = moment(range.start).format("YYYY-MM-DD");
    const convertedeDate = moment(range.end).format("YYYY-MM-DD");

    setrstart(convertedsDate);
    setrend(convertedeDate);
  };

  useEffect(() => {
    getcategory();
  }, []);

  useEffect(() => {
    postAllJobs();
  }, [dCategory, rstart, rend]);

  const postAllJobs = async () => {
    try {
      const res = await axios.post(apiURL + "/postservicecatdevideddatesnew", {
        category: dCategory,
        startDate: rstart,
        endDate: rend,
        city: admin.city,
      });

      if (res.status === 200) {

        
        setdsrnewdata(res.data?.dividedDates);

      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const getcategory = async () => {
    let res = await axios.get(apiURL + "/getcategory");
    if (res.status === 200) {
      setcategorydata(res.data?.category);
    }
  };

  const eventCounts = dsrnewdata.reduce((counts, item) => {
    const newdates = item.dividedDates;

    newdates.forEach((newdate) => {
      const formattedDate = moment(newdate.date).format("YYYY-MM-DD");

      counts[formattedDate] = (counts[formattedDate] || 0) + 1;
    });

    return counts;
  }, {});


  const myEventsList = Object.keys(eventCounts).map((date) => ({
    title: `${eventCounts[date]} DSR`,
    start: new Date(date),
    end: new Date(date),
    count: eventCounts[date],
  }));

  const handleSelectEvent = (event) => {
    const selectedDate = moment(event.start).format("YYYY-MM-DD");

    const url = `/dsrcallist/${selectedDate}/${dCategory}`;

    // Open link in a new tab
    const newTab = window.open(url, "_blank");
    newTab.location && newTab.location.reload(); // Optional: Reload the new tab with the provided URL
  };

  return (
    <div className="web">
      <Header />
      {/* <DSRnav /> */}

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
                        {/* {categorydata.map((item) => (
                          <option value={item.category}>{item.category}</option>
                        ))} */}
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
              <p class="header-text">DSR - {totalCount} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DSRcategory;
