import { useState, useMemo, useEffect } from "react";
import { Appointment, DateValue, AppointmentsByPeriod } from "@/types/scheduling";
import { useLocalStorage } from "./useLocalStorage";

export const useAppointments = (initialData: Appointment[]) => {
    const { data: storedAppointments, saveData, isLoaded } = useLocalStorage(initialData);
    const [appointments, setAppointments] = useState<Appointment[]>(initialData);
    const [agendaDate, setAgendaDate] = useState<DateValue>(() => {
        const today = new Date();
        return {
            day: today.getDate(),
            month: today.getMonth() + 1,
            year: today.getFullYear(),
        };
    });

    // Sincronizar com localStorage quando carregado
    useEffect(() => {
        if (isLoaded) {
            setAppointments(storedAppointments);
        }
    }, [isLoaded, storedAppointments]);

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
        const updated = appointments.filter((apt) => apt.id !== appointmentId);
        setAppointments(updated);
        saveData(updated);
    };

    const handleAddAppointment = (appointment: Appointment) => {
        const updated = [...appointments, appointment];
        setAppointments(updated);
        saveData(updated);
    };

    const handleUpdateAppointment = (appointmentId: string, updates: Partial<Appointment>) => {
        const updated = appointments.map((apt) =>
            apt.id === appointmentId ? { ...apt, ...updates } : apt
        );
        setAppointments(updated);
        saveData(updated);
    };

    return {
        appointments,
        setAppointments,
        agendaDate,
        setAgendaDate,
        filteredAppointments,
        appointmentsByPeriod,
        handleDeleteAppointment,
        handleAddAppointment,
        handleUpdateAppointment,
        isLoaded,
    };
};
