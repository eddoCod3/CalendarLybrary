import { useState } from "react";

interface MonthPickerDialogProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}
const MonthPickerDialog = ({
  selectedDate,
  onChange,
}: MonthPickerDialogProps) => {
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth());
  const selectedYear = new Date().getFullYear();

  const handleMonthChange = (event: { target: { value: string } }) => {
    setSelectedMonth(parseInt(event.target.value, 10));
  };

  const handleApply = () => {
    onChange(new Date(selectedYear, selectedMonth, 1));
    closeDialog();
  };

  const openDialog = () => {
    const dialog = document.getElementById(
      "monthPickerDialog"
    ) as HTMLDialogElement;
    dialog.showModal();
  };

  const closeDialog = () => {
    const dialog = document.getElementById(
      "monthPickerDialog"
    ) as HTMLDialogElement;
    dialog.close();
  };

  return (
    <>
      <button onClick={openDialog}>Select Month</button>

      <dialog id="monthPickerDialog" className="month-picker-dialog">
        <select value={selectedMonth} onChange={handleMonthChange}>
          {Array.from({ length: 12 }, (_, month) => (
            <option key={month} value={month}>
              {new Date(0, month).toLocaleDateString(undefined, {
                month: "long",
              })}
            </option>
          ))}
        </select>

        <button onClick={handleApply}>Apply</button>
        <button onClick={closeDialog}>Cancel</button>
      </dialog>
    </>
  );
};

export default MonthPickerDialog;
