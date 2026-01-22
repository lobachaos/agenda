import React from "react";
import { TimeSelectOption } from "@/types/scheduling";

interface TimeSelectOptionListProps {
    options: TimeSelectOption[];
}

/**
 * Componente responsável por renderizar a lista de opções do TimeSelect
 */
export const TimeSelectOptionList: React.FC<TimeSelectOptionListProps> = ({ options }) => {
    return (
        <>
            {options.map(({ label }) => (
                <option key={label} value={label}>
                    {label}
                </option>
            ))}
        </>
    );
};
