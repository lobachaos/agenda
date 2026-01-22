import {VariantProps} from "class-variance-authority";
import React, {useMemo} from "react";
import {TimeSelectOption, TimeValue} from "@/types/scheduling";
import {
    timeSelectVariants,
    DEFAULT_STEP,
    DEFAULT_START_HOUR,
    DEFAULT_END_HOUR,
    PLACEHOLDER_TEXT
} from "@/configs/time-select.config";
import {
    generateOptions,
    findOptionByLabel,
    formatSelectedValue
} from "@/utils/time-select.utils";
import {TimeSelectOptionList} from "./time-select-option-list";

interface TimeSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'>, VariantProps<typeof timeSelectVariants> {
    value?: TimeValue;
    onChange?: (value: TimeValue) => void;
    step?: number;
    startHour?: number;
    endHour?: number;
}

export const TimeSelect: React.FC<TimeSelectProps> = ({
                                                          variant = 'default',
                                                          className,
                                                          onChange,
                                                          value,
                                                          step = DEFAULT_STEP,
                                                          startHour = DEFAULT_START_HOUR,
                                                          endHour = DEFAULT_END_HOUR,
                                                          ...props
                                                      }) => {
    const options = useMemo<TimeSelectOption[]>(
        () => generateOptions(step, startHour, endHour),
        [step, startHour, endHour]
    );

    const selectedValue = formatSelectedValue(value);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const option = findOptionByLabel(options, e.target.value);
        if (option && onChange) {
            onChange(option.value);
        }
    };

    return (
        <select
            value={selectedValue}
            onChange={handleChange}
            className={`${timeSelectVariants({variant})} ${className || ''}`}
            {...props}
        >
            <option>{PLACEHOLDER_TEXT}</option>
            <TimeSelectOptionList options={options}/>
        </select>
    );
}
