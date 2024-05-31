import React from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import Header from "../layout/Header";
import Enquiryfollowupnav from "../Enquiryfollowupnav";

function Etemplate() {
  return (
    <div>
      <Header />
      <Enquiryfollowupnav />

      <div className="row m-auto">
        <div className="col-md-12">
          <Scheduler
            view="month"
            events={[
              {
                event_id: 1,
                title: "Event 1",
                start: new Date("2021/5/2 09:30"),
                end: new Date("2021/5/2 10:30"),
              },
              {
                event_id: 2,
                title: "Event 2",
                start: new Date("2021/5/4 10:00"),
                end: new Date("2021/5/4 11:00"),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default Etemplate;
