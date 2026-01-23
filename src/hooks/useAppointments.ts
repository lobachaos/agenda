import { useState, useMemo } from "react";
import { Appointment, DateValue, AppointmentsByPeriod } from "@/types/scheduling";

export const useAppointments = (initialData: Appointment[]) => {
    const [appointments, setAppointments] = useState<Appointment[]>(initialData);
    const [agendaDate, setAgendaDate] = useState<DateValue>(() => {
        const today = new Date();
        return {
            day: today.getDate(),
            month: today.getMonth() + 1,
            year: today.getFullYear(),
        };
    });

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
            morning: filteredAppointments.filter(
                (apt) => apt.period === "morning"
            ),
            afternoon: filteredAppointments.filter(
                (apt) => apt.period === "afternoon"
            ),
            evening: filteredAppointments.filter(
                (apt) => apt.period === "evening"
            ),
        };
    }, [filteredAppointments]);

    const handleDeleteAppointment = (appointmentId: string) => {
        setAppointments((prev) =>
            prev.filter((apt) => apt.id !== appointmentId)
        );
    };

    return {
        appointments,
        setAppointments,
        agendaDate,
        setAgendaDate,
        filteredAppointments,
        appointmentsByPeriod,
        handleDeleteAppointment,
    };
};
