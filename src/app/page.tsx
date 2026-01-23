'use client';

import React, { useState } from "react";
import { TimeValue, DateValue } from "@/types/scheduling";
import { SideBar } from "@/components/side-bar";

export default function Page() {
    const [selectedDate, setSelectedDate] = useState<DateValue | undefined>();
    const [selectedTime, setSelectedTime] = useState<TimeValue | undefined>();

    return (
        <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
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
                    <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-lg shadow-lg dark:shadow-zinc-800 p-6 sm:p-8 md:p-10">
                        <div className="flex flex-col gap-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
                                    Agendar Horário
                                </h1>
                                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                                    Preencha os dados ao lado para criar seu agendamento
                                </p>
                            </div>

                            {/* Summary of selected values */}
                            {(selectedDate || selectedTime) && (
                                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 sm:p-6">
                                    <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
                                        Resumo da Reserva
                                    </h2>
                                    <div className="space-y-2 text-sm sm:text-base">
                                        {selectedDate && (
                                            <p className="text-zinc-600 dark:text-zinc-300">
                                                <span className="font-medium">Data:</span> {selectedDate.day}/{selectedDate.month}/{selectedDate.year}
                                            </p>
                                        )}
                                        {selectedTime && (
                                            <p className="text-zinc-600 dark:text-zinc-300">
                                                <span className="font-medium">Horário:</span> {String(selectedTime.hour).padStart(2, '0')}:{String(selectedTime.minute).padStart(2, '0')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Info Section */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                                    <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                                        📱 Mobile
                                    </h3>
                                    <p className="text-sm text-blue-700 dark:text-blue-300">
                                        Toque no ícone do menu para acessar o formulário
                                    </p>
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                                    <h3 className="font-semibold text-green-900 dark:text-green-200 mb-2">
                                        🖥️ Desktop
                                    </h3>
                                    <p className="text-sm text-green-700 dark:text-green-300">
                                        O formulário aparece ao lado automaticamente
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
