import React from "react";
import {MoonStarsIcon, SunHorizonIcon, CloudSunIcon} from "@phosphor-icons/react";
import {Appointment, TimePeriod} from "@/types/scheduling";
import {AppointmentItem} from './index';

interface PeriodSectionProps {
    period: TimePeriod;
    appointments: Appointment[];
    onDeleteAppointment?: (appointmentId: string) => void;
}

const periodConfig: Record<
    TimePeriod,
    {
        label: string;
        timeRange: string;
        icon: React.ReactNode;
    }
> = {
    morning: {
        label: "Manhã",
        timeRange: "09h–12h",
        icon: <SunHorizonIcon size={24} weight="fill" className="text-yellow-400"/>,
    },
    afternoon: {
        label: "Tarde",
        timeRange: "13h–18h",
        icon: <CloudSunIcon size={24} weight="fill" className="text-yellow-400"/>,
    },
    evening: {
        label: "Noite",
        timeRange: "19h–21h",
        icon: <MoonStarsIcon size={24} weight="fill" className="text-yellow-400"/>,
    },
};

export const PeriodSection: React.FC<PeriodSectionProps> = ({
                                                                period,
                                                                appointments,
                                                                onDeleteAppointment,
                                                            }) => {
    const config = periodConfig[period];

    if (appointments.length === 0) {
        return null;
    }

    return (
        <div className="space-y-3 border border-gray-200 rounded-lg p-4">
            {/* Period Header */}
            <div className="flex items-center gap-3 border-b border-gray-200 pb-2 mb-2">
                {config.icon}
                <div className="flex flex-row justify-between w-full">
                    <h3 className="text-lg font-semibold text-gray-300">
                        {config.label}
                    </h3>
                    <p className="text-sm text-gray-400">{config.timeRange}</p>
                </div>
            </div>
            {/* Appointments List */}
            <div className="space-y-2 p-2 flex flex-col justify-start">
                {appointments.map((appointment) => (
                    <AppointmentItem
                        key={appointment.id}
                        appointment={appointment}
                        onDelete={onDeleteAppointment}
                    />
                ))}
            </div>
        </div>
    );
};
