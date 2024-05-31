import React from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import Header from "./layout/Header";

function Calender({ props }) {
  return (
    <div className="row">
      <Header />

      <div className="row m-auto mt-2">
        <div className="col-md-12">
          <div className="card sticky">
            <div className="card-body">
              <div>User > Home</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row pt-3 pb-5 m-auto">
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
  );
}
export default Calender;

// import React from "react";
// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import format from "date-fns/format";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import getDay from "date-fns/getDay";
// import enUS from "date-fns/locale/en-US";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// const locales = {
//   "en-US": enUS,
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// const myEventsList = [
//   {
//     title: "Big metting",
//     allday: true,
//     start: new Date(2023, 6, 0),
//     end: new Date(2023, 6, 0),
//   },
//   {
//     title: "Vacation",
//     start: new Date(2023, 6, 0),
//     end: new Date(2023, 6, 0),
//   },
//   {
//     title: "Conference",
//     start: new Date(2023, 6, 0),
//     end: new Date(2023, 6, 0),
//   },
// ];

// function Calender() {
//   return (
//     <div>
//       <Calendar
//         localizer={localizer}
//         events={myEventsList}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500 }}
//       />
//     </div>
//   );
// }

// export default Calender;
