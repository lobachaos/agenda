import React from "react";
import { DateValue } from "@/types/scheduling";
import { DatePicker } from '../scheduling';

interface AgendaHeaderProps {
    agendaDate: DateValue;
    onDateChange: (date: DateValue) => void;
}

export const AgendaHeader: React.FC<AgendaHeaderProps> = ({
    agendaDate,
    onDateChange,
}) => {
    return (
        <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                Sua agenda
            </h1>
            <div className="flex justify-between mb-6 w-full">
                <p className="text-sm text-zinc-600 mt-1">
                    Consulte os seus cortes de cabelo agendados por dia
                </p>
                <DatePicker value={agendaDate} onChange={onDateChange} />
            </div>
        </div>
    );
};
