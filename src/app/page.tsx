'use client';

import React, {useState} from "react";
import {TimeValue, DateValue, Appointment} from "@/types/scheduling";
import {SideBar} from "@/components/scheduling";
import {AgendaHeader, AgendaContent} from "@/components/agenda";
import {EmptyState} from "@/components/common";
import {useAppointments} from "@/hooks/useAppointments";

// Mock data - substitua pela API real
const mockAppointments: Appointment[] = [
    {
        id: "1",
        clientName: "Ryan Dorwart",
        time: {hour: 11, minute: 0},
        date: {day: 23, month: 1, year: 2026},
        period: "morning",
    },
    {
        id: "2",
        clientName: "Livia Curtis",
        time: {hour: 13, minute: 0},
        date: {day: 23, month: 1, year: 2026},
        period: "afternoon",
    },
    {
        id: "3",
        clientName: "Randy Calzoni",
        time: {hour: 14, minute: 0},
        date: {day: 23, month: 1, year: 2026},
        period: "afternoon",
    },
    {
        id: "4",
        clientName: "Marley Franci",
        time: {hour: 16, minute: 0},
        date: {day: 23, month: 1, year: 2026},
        period: "afternoon",
    },
    {
        id: "5",
        clientName: "Jaylon Korsgaard",
        time: {hour: 17, minute: 0},
        date: {day: 23, month: 1, year: 2026},
        period: "afternoon",
    },
    {
        id: "6",
        clientName: "Maria Herwitz",
        time: {hour: 21, minute: 0},
        date: {day: 23, month: 1, year: 2026},
        period: "evening",
    },
];

export default function Page() {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState<DateValue | undefined>({
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear(),
    });
    const [selectedTime, setSelectedTime] = useState<TimeValue | undefined>();

    const {
        agendaDate,
        setAgendaDate,
        appointmentsByPeriod,
        filteredAppointments,
        handleDeleteAppointment,
    } = useAppointments(mockAppointments);

    const totalAppointments = filteredAppointments.length;

    return (
        <div className="flex min-h-screen bg-gray-800 font-sans text-white">
            {/* Sidebar */}
            <SideBar
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                selectedTime={selectedTime}
                onTimeChange={setSelectedTime}
            />

            {/* Main Content */}
            <main className="flex-1 w-full md:w-auto">
                <div className="flex min-h-screen items-center justify-center p-4 sm:p-8 md:p-12">
                    <div className="flex flex-col gap-8 w-full">
                        {/* Header */}
                        <AgendaHeader
                            agendaDate={agendaDate}
                            onDateChange={setAgendaDate}
                        />

                        {/* Content */}
                        <div>
                            {totalAppointments === 0 ? (
                                <EmptyState/>
                            ) : (
                                <AgendaContent
                                    appointmentsByPeriod={appointmentsByPeriod}
                                    onDeleteAppointment={handleDeleteAppointment}
                                    totalAppointments={totalAppointments}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
