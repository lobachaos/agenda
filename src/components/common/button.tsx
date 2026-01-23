import {cva, VariantProps} from "class-variance-authority";

export const buttonVariants = cva('', {
    variants: {
        variant: {
            primary: 'bg-yellow text-gray-900 hover:border border-solid border-yellow-light',
        },
        disabled: {
            true: 'cursor-not-allowed opacity-30',
            false: ''
        }
    }
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, Omit<VariantProps<typeof buttonVariants>, 'disabled'> {
}

export const Button: React.FC<ButtonProps> = ({
                                                  variant = 'primary',
                                                  disabled = false,
                                                  className,
                                                  children,
                                                  ...props
                                              }) => {
    return (
        <button
            className={`${buttonVariants({variant, disabled})} ${className || ''}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};
