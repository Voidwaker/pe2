import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import './../styles/Calendar.css'; 

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const handleChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="calendar-container">
      <h3>Select a Date</h3>
      <DatePicker
        onChange={handleChange}
        value={selectedDate}
        calendarIcon={null} 
      />
    </div>
  );
};

export default Calendar;
