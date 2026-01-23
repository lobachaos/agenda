import React, {useRef} from "react";
import {CalendarIcon} from "@phosphor-icons/react";
import {DateValue} from "@/types/scheduling";

interface DatePickerProps {
    value?: DateValue;
    onChange?: (date: DateValue) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({value, onChange}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateString = e.target.value; // Formato: YYYY-MM-DD
        if (dateString) {
            const [year, month, day] = dateString.split('-').map(Number);
            onChange?.({
                day,
                month,
                year,
            });
        }
    };

    const handleIconClick = () => {
        if (inputRef.current) {
            // Tenta usar showPicker se disponível (melhor compatibilidade)
            if ('showPicker' in HTMLInputElement.prototype) {
                (inputRef.current as any).showPicker();
            } else {
                // Fallback para navegadores antigos
                (inputRef.current as HTMLInputElement).click();
            }
        }
    };

    const inputDateString = value
        ? `${value.year}-${String(value.month).padStart(2, "0")}-${String(
            value.day
        ).padStart(2, "0")}`
        : "";

    return (
        <div className="relative w-fit">
            <input
                ref={inputRef}
                type="date"
                value={inputDateString}
                onChange={handleDateChange}
                className="
        appearance-none
        bg-gray-800
        border border-gray-500
        rounded-lg
        px-4 py-2 pr-10
        text-gray-200
        cursor-pointer
        focus:outline-none
        focus:ring-2 focus:ring-yellow-400
        [&::-webkit-calendar-picker-indicator]:hidden
      "
            />

            <button
                type="button"
                onClick={handleIconClick}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 cursor-pointer hover:opacity-80 transition-opacity"
                aria-label="Open date picker"
            >
                <CalendarIcon
                    size={18}
                    className="text-yellow-400"
                />
            </button>
        </div>
    );
};
