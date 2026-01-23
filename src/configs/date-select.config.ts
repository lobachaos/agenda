import { cva } from "class-variance-authority";

/**
 * Variantes de estilo do DateSelect usando CVA
 */
export const dateSelectVariants = cva(
    'rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400',
    {
        variants: {
            variant: {
                default: 'bg-white border border-gray-300 hover:border-gray-400 text-gray-200 dark:bg-zinc-800 dark:border-zinc-600 dark:hover:border-zinc-500',
            }
        }
    }
);

/**
 * Configurações padrão do DateSelect
 */
export const DEFAULT_START_DATE = new Date(); // Data de hoje
export const DEFAULT_DAYS_AHEAD = 30; // Próximos 30 dias
export const PLACEHOLDER_TEXT = 'Selecione uma Data';
