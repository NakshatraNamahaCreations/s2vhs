import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Enquiryfollowupnav from "./Enquiryfollowupnav";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Header from "../components/layout/Header";
import moment from "moment";

const Enquiryfollowup = () => {
  const [data, setdata] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getenquiryfollowup();
  }, []);

  const getenquiryfollowup = async () => {
    let res = await axios.get(apiURL + "/getcallquotedata");
    if (res.status === 200) {
      const data = res.data?.enquiryfollowup;

      const latestRecords = {};

      data.forEach((item) => {
        const { EnquiryId, createdAt } = item;
        if (
          !latestRecords[EnquiryId] ||
          createdAt > latestRecords[EnquiryId].createdAt
        ) {
          latestRecords[EnquiryId] = item;
        }
      });

      const latestRecordsArray = Object.values(latestRecords);

      setdata(latestRecordsArray);
    }
  };

  const localizer = momentLocalizer(moment);
  const navigate = useNavigate();

  const currentDate = moment().format("dddd, MM/DD/YYYY");

  console.log(currentDate);

  const eventCounts = data.reduce((counts, item) => {
    const date = item.nxtfoll;
    counts[date] = (counts[date] || 0) + 1;
    console.log(counts[date]);

    return counts;
  }, {});

  function calculateTotalCount(array) {
    let totalCount = 0;

    for (let i = 0; i < array.length; i++) {
      if (array[i].hasOwnProperty("nxtfoll")) {
        totalCount++;
      }
    }

    return totalCount;
  }

  const totalCount = calculateTotalCount(data);

  const myEventsList = Object.keys(eventCounts).map((date) => ({
    title: `${eventCounts[date]} Followup`,
    start: new Date(date),
    end: new Date(date),
    count: eventCounts[date],
  }));

  const handleSelectEvent = (event) => {
    const selectedDate = moment(event.start).format("YYYY-MM-DD");
    navigate(`/enquirydatatable/${selectedDate}`);
  };

  return (
    <div className="web">
      <Header />
      <Enquiryfollowupnav />
      <div className="p-4">
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
            style={{ backgroundColor: "rgb(169, 4, 46)", textAlign: "center" }}
          >
            <p class="header-text">Followups - {totalCount} </p>
          </div>{" "}
          {/* <div >{totalCount}</div> */}
        </div>
      </div>
    </div>
  );
};

export default Enquiryfollowup;
