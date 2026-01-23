import React, { useState } from "react";
import {List, ListIcon, X, XIcon} from "@phosphor-icons/react";
import { TimeValue, DateValue } from "@/types/scheduling";
import { TimeSlotPicker, DateSelect } from "@/components";

interface SideBarProps {
    selectedDate?: DateValue;
    onDateChange?: (date: DateValue) => void;
    selectedTime?: TimeValue;
    onTimeChange?: (time: TimeValue) => void;
}

export const SideBar: React.FC<SideBarProps> = ({
    selectedDate,
    onDateChange,
    selectedTime,
    onTimeChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className="fixed top-4 right-4 z-50 md:hidden bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-800 transition-colors dark:bg-gray-950 dark:hover:bg-gray-800"
                aria-label="Toggle menu"
            >
                {isOpen ? (
                    <XIcon size={24} weight="bold" />
                ) : (
                    <ListIcon size={24} weight="bold" />
                )}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-40 
                    w-full sm:w-80 md:w-96 lg:w-80 xl:w-96
                    bg-gray-700  text-white
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                    md:relative md:inset-auto md:translate-x-0 md:transition-none
                    overflow-y-auto
                `}
            >
                <div className="flex flex-col h-full p-4 sm:p-6 gap-6">
                    {/* Header */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl sm:text-2xl font-semibold">Agende um atendimento</h2>
                        <p className="text-sm sm:text-base text-gray-300">
                            Selecione data, horário e informe o nome do cliente para criar o agendamento
                        </p>
                    </div>

                    {/* Forms Section */}
                    <div className="flex flex-col gap-6 flex-1">
                        <div className="flex flex-col gap-4">
                            <DateSelect
                                value={selectedDate}
                                onChange={onDateChange}
                                daysAhead={30}
                            />
                        </div>

                        <div>
                            <TimeSlotPicker
                                value={selectedTime}
                                onChange={onTimeChange}
                                step={30}
                                startHour={8}
                                endHour={21}
                                unavailableSlots={["11:00", "13:00", "14:00", "16:00", "17:00"]}
                            />
                        </div>
                    </div>

                    {/* Footer CTA */}
                    <button
                        className="w-full bg-yellow-400 text-gray-900 font-semibold py-4 px-4 rounded-lg hover:bg-yellow-300 transition-colors"
                        onClick={closeSidebar}
                    >
                        AGENDAR
                    </button>
                </div>
            </aside>
        </>
    );
};
