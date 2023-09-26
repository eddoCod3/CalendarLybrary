import { SetStateAction, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import MonthPickerDialog from "./monthPickerDialog";
const App = () => {
  function getDaysArray(year: number, month: number) {
    const date = new Date(year, month, 1);
    const daysArray = [];

    while (date.getMonth() === month) {
      daysArray.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return daysArray;
  }

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDialog, setShowDialog] = useState(false);
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);

  const handleDateChange = (date: SetStateAction<Date>) => {
    setSelectedDate(date);
    setShowDialog(false);
  };

  useEffect(() => {
    // Calculate and set the days of the selected month
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysArray = getDaysArray(year, month);
    setDaysInMonth(daysArray);
  }, [selectedDate]);

  return (
    <div className="app-container">
      <div className="custom-navbar">
        <button
          onClick={() =>
            handleDateChange(
              new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() - 1,
                1
              )
            )
          }
        >
          {"<"}
        </button>

        <button onClick={() => setShowDialog(true)}>{"z"}</button>

        <div
          className="month-year-display"
          style={{ textTransform: "capitalize" }}
        >
          {selectedDate
            .toLocaleDateString("en-US", { month: "long", year: "numeric" })
            .replace(/\bde\b/g, "")}
        </div>

        <button
          onClick={() =>
            handleDateChange(
              new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                1
              )
            )
          }
        >
          {">"}
        </button>
      </div>

      {showDialog && (
        <MonthPickerDialog
          selectedDate={selectedDate}
          onChange={handleDateChange}
        />
      )}

      {/* Render the Calendar with the updated value prop */}
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        prev2Label=""
        calendarType="gregory"
        defaultView="month"
        minDetail="year"
        showNavigation={false}
      />
    </div>
  );
};

export default App;
