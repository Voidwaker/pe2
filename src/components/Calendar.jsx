import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import '../styles/Calendar.css';

/**
 * Calendar component that allows users to select a date.
 *
 * @component
 * @returns {JSX.Element} The calendar date picker.
 */
const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  /**
   * Handles date selection change.
   *
   * @param {Date} date - The selected date.
   */
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
