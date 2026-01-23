'use client';

import React, {useState, useMemo} from "react";
import {TimeValue, DateValue, Appointment} from "@/types/scheduling";
import {SideBar} from "@/components/scheduling";
import {AgendaHeader, AgendaContent} from "@/components/agenda";
import {EmptyState} from "@/components/common";
import {useAppointments} from "@/hooks/useAppointments";

// Função para determinar o período baseado na hora
const getPeriodFromHour = (hour: number) => {
    if (hour < 12) return 'morning' as const;
    if (hour < 18) return 'afternoon' as const;
    return 'evening' as const;
};

// Função para gerar ID único
const generateId = () => `apt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export default function Page() {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState<DateValue | undefined>({
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear(),
    });
    const [selectedTime, setSelectedTime] = useState<TimeValue | undefined>();
    const [clientName, setClientName] = useState('');

    const {
        appointments,
        agendaDate,
        setAgendaDate,
        appointmentsByPeriod,
        filteredAppointments,
        handleDeleteAppointment,
        handleAddAppointment,
        isLoaded,
    } = useAppointments([]);

    // Obter horários indisponíveis para a data selecionada
    const unavailableSlots = useMemo(() => {
        if (!selectedDate) return [];

        return appointments
            .filter(apt =>
                apt.date.day === selectedDate.day &&
                apt.date.month === selectedDate.month &&
                apt.date.year === selectedDate.year
            )
            .map(apt => `${String(apt.time.hour).padStart(2, '0')}:${String(apt.time.minute).padStart(2, '0')}`)
            .sort();
    }, [appointments, selectedDate]);

    // Ordenar agendamentos por período em ordem ascendente (por hora)
    const sortedAppointmentsByPeriod = useMemo(() => {
        return {
            morning: [...appointmentsByPeriod.morning].sort((a, b) =>
                a.time.hour * 60 + a.time.minute - (b.time.hour * 60 + b.time.minute)
            ),
            afternoon: [...appointmentsByPeriod.afternoon].sort((a, b) =>
                a.time.hour * 60 + a.time.minute - (b.time.hour * 60 + b.time.minute)
            ),
            evening: [...appointmentsByPeriod.evening].sort((a, b) =>
                a.time.hour * 60 + a.time.minute - (b.time.hour * 60 + b.time.minute)
            ),
        };
    }, [appointmentsByPeriod]);

    const totalAppointments = filteredAppointments.length;

    // Função para criar novo agendamento
    const handleCreateAppointment = () => {
        if (!selectedDate || !selectedTime || !clientName.trim()) {
            alert('Por favor, preencha todos os campos (data, hora e nome)');
            return;
        }

        const newAppointment: Appointment = {
            id: generateId(),
            clientName: clientName.trim(),
            time: selectedTime,
            date: selectedDate,
            period: getPeriodFromHour(selectedTime.hour),
        };

        handleAddAppointment(newAppointment);

        // Mudar agenda para a data do novo agendamento
        setAgendaDate(selectedDate);

        // Limpar formulário
        setClientName('');
        setSelectedTime(undefined);

        alert('Agendamento criado com sucesso!');
    };

    if (!isLoaded) {
        return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
    }

    return (
        <div className="flex min-h-screen bg-gray-800 font-sans text-white">
            {/* Sidebar */}
            <SideBar
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                selectedTime={selectedTime}
                onTimeChange={setSelectedTime}
                clientName={clientName}
                onClientNameChange={setClientName}
                onCreateAppointment={handleCreateAppointment}
                unavailableSlots={unavailableSlots}
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
                                    appointmentsByPeriod={sortedAppointmentsByPeriod}
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
