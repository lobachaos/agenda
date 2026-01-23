import React from "react";
import { TimeValue } from "@/types/scheduling";
import { cva, VariantProps } from "class-variance-authority";

const timeSlotButtonVariants = cva(
    'px-4 py-2 rounded-md text-sm font-medium transition-all focus:outline-none',
    {
        variants: {
            available: {
                true: 'bg-gray-700 text-gray-100 hover:bg-gray-600 cursor-pointer dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700',
                false: 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50 dark:bg-gray-800 dark:text-gray-600 dark:opacity-40',
            },
            selected: {
                true: 'bg-gray-700 text-yellow-400 border-2 border-yellow-400 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-300',
                false: '',
            },
        },
        compoundVariants: [
            {
                available: true,
                selected: true,
                className: 'bg-gray-700 text-yellow-400 border-2 border-yellow-400 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-300',
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
            className={`${timeSlotButtonVariants({ available, selected })} ${className || ''}`}
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
