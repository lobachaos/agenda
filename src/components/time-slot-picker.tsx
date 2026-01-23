import React, { useMemo } from "react";
import { TimeValue, TimeSelectOption } from "@/types/scheduling";
import {
    generateOptions,
    groupOptionsByPeriod,
    formatSelectedValue,
} from "@/utils/time-select.utils";
import { TimeSlotButton } from "./time-slot-button";

interface TimeSlotPickerProps {
    value?: TimeValue;
    onChange?: (value: TimeValue) => void;
    step?: number;
    startHour?: number;
    endHour?: number;
    unavailableSlots?: string[]; // Array de labels indisponíveis (ex: ["11:00", "13:00"])
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
    value,
    onChange,
    step = 30,
    startHour = 0,
    endHour = 24,
    unavailableSlots = [],
}) => {
    const options = useMemo<TimeSelectOption[]>(() => {
        const allOptions = generateOptions(step, startHour, endHour);
        return allOptions.map(option => ({
            ...option,
            available: !unavailableSlots.includes(option.label),
        }));
    }, [step, startHour, endHour, unavailableSlots]);

    const groups = useMemo(() => groupOptionsByPeriod(options), [options]);

    const selectedValue = formatSelectedValue(value);

    return (
        <div className="w-full space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Horários
                </h2>

                {groups.map(group => (
                    <div key={group.period} className="mb-6">
                        <h3 className="text-sm font-medium text-gray-300 mb-3">
                            {group.label}
                        </h3>
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                            {group.slots.map(slot => (
                                <TimeSlotButton
                                    key={slot.label}
                                    time={slot.value}
                                    label={slot.label}
                                    available={slot.available !== false}
                                    selected={selectedValue === slot.label}
                                    onClick={onChange}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
