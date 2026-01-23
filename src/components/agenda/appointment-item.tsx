import React from "react";
import { TrashIcon } from "@phosphor-icons/react";
import { Appointment } from "@/types/scheduling";

interface AppointmentItemProps {
    appointment: Appointment;
    onDelete?: (appointmentId: string) => void;
}

export const AppointmentItem: React.FC<AppointmentItemProps> = ({
    appointment,
    onDelete,
}) => {
    const timeString = `${String(appointment.time.hour).padStart(2, "0")}:${String(
        appointment.time.minute
    ).padStart(2, "0")}`;

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800">
            <div className="flex items-center gap-4 flex-1">
                <span className="font-semibold text-gray-200 w-12">{timeString}</span>
                <span className="text-gray-200 flex-1">{appointment.clientName}</span>
            </div>
            <button
                onClick={() => onDelete?.(appointment.id)}
                className="p-2 text-yellow-400 hover:text-red-600 hover:rounded-md transition-colors"
                aria-label={`Delete appointment with ${appointment.clientName}`}
            >
                <TrashIcon size={20} weight="regular" />
            </button>
        </div>
    );
};
