import React from "react";
import { DateSelectOption } from "@/types/scheduling";

interface DateSelectOptionItemProps {
    options: DateSelectOption[];
}

/**
 * Componente responsável por renderizar a lista de opções do DateSelect
 */
export const DateSelectOptionItem: React.FC<DateSelectOptionItemProps> = ({ options }) => {
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
