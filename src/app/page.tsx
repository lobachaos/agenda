'use client';

import { TimeSelect, DateSelect } from "@/components";
import { useState } from "react";
import { TimeValue, DateValue } from "@/types/scheduling";

export default function Page() {
    const [selectedTime, setSelectedTime] = useState<TimeValue | undefined>();
    const [selectedDate, setSelectedDate] = useState<DateValue | undefined>();

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-zinc-900 sm:items-start rounded-lg shadow-lg dark:shadow-zinc-800">
                <div className="w-full flex flex-col gap-8">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Agendar Horário</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Data Select */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="date-select" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Selecione a data
                            </label>
                            <DateSelect
                                id="date-select"
                                value={selectedDate}
                                onChange={setSelectedDate}
                                daysAhead={30}
                            />
                        </div>

                        {/* Time Select */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="time-select" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Selecione o horário
                            </label>
                            <TimeSelect
                                id="time-select"
                                value={selectedTime}
                                onChange={setSelectedTime}
                                step={30}
                                startHour={8}
                                endHour={18}
                            />
                        </div>
                    </div>

                    {/* Exibição do agendamento */}
                    {selectedDate && selectedTime && (
                        <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-700">
                            <p className="text-sm text-zinc-700 dark:text-zinc-300">
                                Agendamento: <span className="font-bold text-yellow-400">
                                    {selectedDate.day}/{selectedDate.month}/{selectedDate.year} às {String(selectedTime.hour).padStart(2, "0")}:{String(selectedTime.minute).padStart(2, "0")}
                                </span>
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
