import { DayPicker } from "react-day-picker";
import { it } from "react-day-picker/locale";
import { startOfToday } from "date-fns";
import { cn } from "../../lib/utils";

export default function DateRangePicker({ value, onChange, numberOfMonths = 1, className, defaultMonth }) {
  return (
    <DayPicker
      mode="range"
      locale={it}
      weekStartsOn={1}
      selected={value}
      onSelect={onChange}
      disabled={{ before: startOfToday() }}
      excludeDisabled
      numberOfMonths={numberOfMonths}
      defaultMonth={defaultMonth ?? value?.from}
      animate
      className={cn("rdp-petbnb", className)}
    />
  );
}
