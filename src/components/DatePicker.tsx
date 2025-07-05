import { useState } from 'react';
import { DateOption } from '../types';

interface DatePickerProps {
  dates: DateOption[];
  onDateSelect: (date: number) => void;
}

export default function DatePicker({ dates, onDateSelect }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState(12);

  const handleDateClick = (date: number) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <div className="mb-8">
      <p className="text-gray-600 text-base mb-6 font-normal">
        Izaberite dostupne dane u <span className="text-blue-600 font-medium">avgustu</span>
      </p>
      
      <div className="flex justify-center space-x-4 mb-8">
        {dates.map((dateOption) => (
          <button
            key={dateOption.date}
            onClick={() => handleDateClick(dateOption.date)}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all shadow-md ${
              selectedDate === dateOption.date
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {dateOption.date}
          </button>
        ))}
      </div>
    </div>
  );
}
