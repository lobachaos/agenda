import React from "react";
import { Appointment, AppointmentsByPeriod } from "@/types/scheduling";
import { PeriodSection } from './index';

interface AgendaContentProps {
    appointmentsByPeriod: AppointmentsByPeriod;
    onDeleteAppointment: (appointmentId: string) => void;
    totalAppointments: number;
}

export const AgendaContent: React.FC<AgendaContentProps> = ({
    appointmentsByPeriod,
    onDeleteAppointment,
    totalAppointments,
}) => {
    return (
        <div className="space-y-8">
            {/* Morning Section */}
            <PeriodSection
                period="morning"
                appointments={appointmentsByPeriod.morning}
                onDeleteAppointment={onDeleteAppointment}
            />

            {/* Afternoon Section */}
            <PeriodSection
                period="afternoon"
                appointments={appointmentsByPeriod.afternoon}
                onDeleteAppointment={onDeleteAppointment}
            />

            {/* Evening Section */}
            <PeriodSection
                period="evening"
                appointments={appointmentsByPeriod.evening}
                onDeleteAppointment={onDeleteAppointment}
            />

            {/* Summary Footer */}
            <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-zinc-600">
                    Total de agendamentos:{" "}
                    <span className="font-semibold text-zinc-900">
                        {totalAppointments}
                    </span>
                </p>
            </div>
        </div>
    );
};
