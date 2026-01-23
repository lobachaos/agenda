import React from "react";
import {TimeValue} from "@/types/scheduling";
import {cva, VariantProps} from "class-variance-authority";

const timeSlotButtonVariants = cva(
    'px-4 py-2 rounded-md text-sm font-medium transition-all focus:outline-none',
    {
        variants: {
            available: {
                true: 'bg-gray-600 text-gray-100 hover:bg-gray-600 cursor-pointer',
                false: 'bg-gray-600 text-gray-500 cursor-not-allowed border border-solid border-gray-500',
            },
            selected: {
                true: 'bg-gray-600 text-yellow-400 border-2 border-yellow-400',
                false: '',
            },
        },
        compoundVariants: [
            {
                available: true,
                selected: true,
                className: 'bg-gray-600 text-yellow-400 border-2 border-yellow-400',
            },
        ],
    }
);

interface TimeSlotButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>,
        Omit<VariantProps<typeof timeSlotButtonVariants>, 'available'> {
    time: TimeValue;
    label: string;
    available?: boolean;
    selected?: boolean;
    onClick?: (time: TimeValue) => void;
}

export const TimeSlotButton: React.FC<TimeSlotButtonProps> = ({
                                                                  time,
                                                                  label,
                                                                  available = true,
                                                                  selected = false,
                                                                  onClick,
                                                                  className,
                                                                  ...props
                                                              }) => {
    return (
        <button
            className={`${timeSlotButtonVariants({available, selected})} ${className || ''}`}
            disabled={!available}
            onClick={() => {
                if (available && onClick) {
                    onClick(time);
                }
            }}
            {...props}
        >
            {label}
        </button>
    );
};
