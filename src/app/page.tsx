'use client';

import React, {useState, useMemo} from "react";
import {TimeValue, DateValue, Appointment, AppointmentsByPeriod} from "@/types/scheduling";
import {SideBar} from "@/components/side-bar";
import {DatePicker, PeriodSection} from "@/components";

// Mock data - substitua pela API real
const mockAppointments: Appointment[] = [
    {
        id: "1",
        clientName: "Ryan Dorwart",
        time: {hour: 11, minute: 0},
        date: {day: 10, month: 1, year: 2024},
        period: "morning",
    },
    {
        id: "2",
        clientName: "Livia Curtis",
        time: {hour: 13, minute: 0},
        date: {day: 10, month: 1, year: 2024},
        period: "afternoon",
    },
    {
        id: "3",
        clientName: "Randy Calzoni",
        time: {hour: 14, minute: 0},
        date: {day: 10, month: 1, year: 2024},
        period: "afternoon",
    },
    {
        id: "4",
        clientName: "Marley Franci",
        time: {hour: 16, minute: 0},
        date: {day: 10, month: 1, year: 2024},
        period: "afternoon",
    },
    {
        id: "5",
        clientName: "Jaylon Korsgaard",
        time: {hour: 17, minute: 0},
        date: {day: 10, month: 1, year: 2024},
        period: "afternoon",
    },
    {
        id: "6",
        clientName: "Maria Herwitz",
        time: {hour: 21, minute: 0},
        date: {day: 10, month: 1, year: 2024},
        period: "evening",
    },
];

export default function Page() {
    const [selectedDate, setSelectedDate] = useState<DateValue | undefined>();
    const [selectedTime, setSelectedTime] = useState<TimeValue | undefined>();
    const [agendaDate, setAgendaDate] = useState<DateValue>({
        day: 10,
        month: 1,
        year: 2024,
    });
    const [appointments, setAppointments] = useState<Appointment[]>(
        mockAppointments
    );

    // Filtrar agendamentos pela data selecionada
    const filteredAppointments = useMemo(() => {
        return appointments.filter(
            (apt) =>
                apt.date.day === agendaDate.day &&
                apt.date.month === agendaDate.month &&
                apt.date.year === agendaDate.year
        );
    }, [appointments, agendaDate]);

    // Agrupar por período
    const appointmentsByPeriod = useMemo<AppointmentsByPeriod>(() => {
        return {
            morning: filteredAppointments.filter((apt) => apt.period === "morning"),
            afternoon: filteredAppointments.filter((apt) => apt.period === "afternoon"),
            evening: filteredAppointments.filter((apt) => apt.period === "evening"),
        };
    }, [filteredAppointments]);

    const handleDeleteAppointment = (appointmentId: string) => {
        setAppointments((prev) =>
            prev.filter((apt) => apt.id !== appointmentId)
        );
    };

    const totalAppointments = filteredAppointments.length;

    return (
        <div className="flex min-h-screen bg-gray-800 font-sans text-white">
            {/* Sidebar - fixed on mobile, relative on desktop */}
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
                        <div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                                Sua agenda
                            </h1>
                            <div className="flex justify-between mb-6 w-full">
                                <p className="text-sm text-zinc-600 mt-1">
                                    Consulte os seus cortes de cabelo agendados por dia
                                </p>
                                <DatePicker
                                    value={agendaDate}
                                    onChange={setAgendaDate}
                                />
                            </div>
                        </div>

                        {/* Agenda Section */}
                        <div>
                            {totalAppointments === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-lg text-zinc-600 mb-2">
                                        Nenhum agendamento para esta data
                                    </p>
                                    <p className="text-sm text-zinc-500">
                                        Selecione outra data ou crie um novo agendamento
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {/* Morning Section */}
                                    <PeriodSection
                                        period="morning"
                                        appointments={appointmentsByPeriod.morning}
                                        onDeleteAppointment={handleDeleteAppointment}
                                    />

                                    {/* Afternoon Section */}
                                    <PeriodSection
                                        period="afternoon"
                                        appointments={appointmentsByPeriod.afternoon}
                                        onDeleteAppointment={handleDeleteAppointment}
                                    />

                                    {/* Evening Section */}
                                    <PeriodSection
                                        period="evening"
                                        appointments={appointmentsByPeriod.evening}
                                        onDeleteAppointment={handleDeleteAppointment}
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
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
