import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class EventCalendar extends Component {
  render() {
    return (
      <div style={{ height: "500px" }}>
        <Calendar
          localizer={localizer}
          events={this.props.events}
          startAccessor="date"
          endAccessor="end_at"
        />
      </div>
    );
  }
}

export default EventCalendar;
