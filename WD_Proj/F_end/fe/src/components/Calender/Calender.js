import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import "./calender.css";

export default function BasicDateCalendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="calendarContainer">
        <DateCalendar 
          sx={{ 
            width: 600, 
            height: 600, 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            borderRadius: '8px', 
            backgroundColor: 'white', 
            padding: '16px' 
          }}
        />
      </div>
    </LocalizationProvider>
  );
}