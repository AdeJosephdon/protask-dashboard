import { useState } from 'react';
import { Icon } from '@iconify/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';

const Calendar = (prop) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>Calendar</h2>
        <button
          className="toggle-button"
          onClick={() => prop.calendarClicked()}
          aria-label="close calendar"
        >
          <Icon
            icon="icon-park-solid:back"
            width="48"
            height="48"
            style={{ color: '#fa0808' }}
          />
        </button>
      </div>
      {/* Always-visible input */}
      <input
        type="text"
        className="custom-input"
        value={selectedDate.toLocaleDateString()}
        onChange={() => {}}
        readOnly
      />

      {/* Always-visible calendar */}
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline
        renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
          <div className="custom-header">
            <button onClick={decreaseMonth} aria-label="Previous Month">
              <Icon icon="mingcute:left-fill" width="24" height="24" />
            </button>
            <span>
              {monthDate.toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <button onClick={increaseMonth} aria-label="Next Month">
              <Icon icon="mingcute:right-fill" width="24" height="24" />
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default Calendar;
