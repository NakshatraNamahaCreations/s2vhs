import { Scheduler } from "@aldabil/react-scheduler";
import React,{useState,useEffect} from "react";
import Header from "../layout/Header";
import axios from "axios";
import moment from "moment";
import Quotefollowupnav from "../Quotefollowupnav";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import { useNavigate } from "react-router-dom";

function Quotecall() {
  const [data, setdata] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;


  useEffect(() => {
    getquotedata();
  }, []);

  const getquotedata = async () => {
    let res = await axios.get(apiURL + "/getquotecalldata");
    if ((res.status = 200)) {
      setdata(res.data?.quotefollowup);
    }
  };

  const localizer = momentLocalizer(moment);
  const navigate = useNavigate();

  const eventCounts = data.reduce((counts, item) => {
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
    navigate(`/quotecalldatatable/${selectedDate}`);
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

  const totalCount = calculateTotalCount(data);
  return (
    <div className="web">
      <Header />
      <Quotefollowupnav />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
             
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
export default Quotecall;
