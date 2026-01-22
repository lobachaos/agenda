import { cva } from "class-variance-authority";

/**
 * Variantes de estilo do TimeSelect usando CVA
 */
export const timeSelectVariants = cva(
    'rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow focus:text-yellow',
    {
        variants: {
            variant: {
                default: 'bg-gray-600 border border-gray-500 hover:bg-gray-500 text-gray-200',
            }
        }
    }
);

/**
 * Configurações padrão do TimeSelect
 */
export const DEFAULT_STEP = 30; // minutos
export const DEFAULT_START_HOUR = 0;
export const DEFAULT_END_HOUR = 24;
export const PLACEHOLDER_TEXT = 'Selecione um Horário';
