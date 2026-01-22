'use client';

import { TimeSelect } from "@/components";
import { useState } from "react";
import { TimeValue } from "@/types/scheduling";

export default function Home() {
    const [selectedTime, setSelectedTime] = useState<TimeValue | undefined>();

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-zinc-900 sm:items-start rounded-lg shadow-lg dark:shadow-zinc-800">
                <div className="w-full flex flex-col gap-8">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Agendar Horário</h1>
                    <div className="flex items-center gap-2">
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
            </main>
        </div>
    );
}
