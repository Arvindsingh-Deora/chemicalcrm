// Calendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../Style/Calender.css';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar">
      <h2>Select a Date</h2>
      <Calendar onChange={setDate} value={date} />
    </div>
  );
};

export default MyCalendar;
