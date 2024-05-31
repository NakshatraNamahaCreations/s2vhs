import React, { useEffect, useState,useContext} from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";
import Etoday from "../Tab/Etoday";
import followdata from '../Contextdata'
// import "react-big-calender/lib/css/react-big-calendar"

const localizer = momentLocalizer(moment);
 function Terms() {

  const [data, setdata] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getenquiryadd();
  }, []);

  const getenquiryadd = async () => {
    let res = await axios.get(apiURL + "/getenquiryfollow");
    if ((res.status = 200)) {
      setdata(res.data?.enquiryfollowup);
    }
  };

  const event = data.map((i) => {
    return {
      title: "Followups",
      start: new Date(i.nxtfoll),
      end: new Date(i.nxtfoll),
    };
  });

  const [selected, setselected] = useState();

  const handleSelected = (event) => {
    setselected(event);
    console.info("[handleSelected - event]", event);

    window.location.assign("/etoday");
  };
 
  return (
    <>
      <div className="web">
        <div style={{ padding: "20px" }}>
          <Calendar
            localizer={localizer}
            startAccessor={"start"}
            events={event}
            endAccessor={"end"}
            style={{ height: 700 }}
            eventPropGetter={(e) => {
              return {
                style: {
                  background: "red",
                  color: "white",
                  height: "30px",
                },
              };
            }}
            selected={selected}
            onSelectEvent={handleSelected}
            views={[Views.MONTH, Views.DAY]}
          />

        </div>
      </div>
    </>
  );
}

export default Terms;
