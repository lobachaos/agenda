import { VariantProps } from "class-variance-authority";
import React, { useMemo } from "react";
import { DateSelectOption, DateValue } from "@/types/scheduling";
import {
    dateSelectVariants,
    DEFAULT_START_DATE,
    DEFAULT_DAYS_AHEAD,
    PLACEHOLDER_TEXT
} from "@/configs/date-select.config";
import {
    generateDateOptions,
    findDateOptionByLabel,
    formatSelectedDateValue
} from "@/utils/date-select.utils";
import { DateSelectOptionItem } from "./date-select-option-item";

interface DateSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'>, VariantProps<typeof dateSelectVariants> {
    value?: DateValue;
    onChange?: (value: DateValue) => void;
    startDate?: Date;
    daysAhead?: number;
}

export const DateSelect: React.FC<DateSelectProps> = ({
    variant = 'default',
    className,
    onChange,
    value,
    startDate = DEFAULT_START_DATE,
    daysAhead = DEFAULT_DAYS_AHEAD,
    ...props
}) => {
    const options = useMemo<DateSelectOption[]>(
        () => generateDateOptions(startDate, daysAhead),
        [startDate, daysAhead]
    );

    const selectedValue = formatSelectedDateValue(value);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const option = findDateOptionByLabel(options, e.target.value);
        if (option && onChange) {
            onChange(option.value);
        }
    };

    return (
        <select
            value={selectedValue}
            onChange={handleChange}
            className={`${dateSelectVariants({variant})} ${className || ''}`}
            {...props}
        >
            <option>{PLACEHOLDER_TEXT}</option>
            <DateSelectOptionItem options={options} />
        </select>
    );
}
