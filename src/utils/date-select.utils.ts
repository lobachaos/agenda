import { DateSelectOption, DateValue } from "@/types/scheduling";

/**
 * Formata uma data em formato d/M/Y
 * @example formatDate({day: 22, month: 1, year: 2026}) => "22/1/2026"
 */
export function formatDate(day: number, month: number, year: number): string {
    return `${day}/${month}/${year}`;
}

/**
 * Converte um objeto Date para DateValue
 */
export function dateToDateValue(date: Date): DateValue {
    return {
        day: date.getDate(),
        month: date.getMonth() + 1, // getMonth() retorna 0-11
        year: date.getFullYear(),
    };
}

/**
 * Converte um DateValue para um objeto Date (às 00:00)
 */
export function dateValueToDate(value: DateValue): Date {
    return new Date(value.year, value.month - 1, value.day, 0, 0, 0, 0);
}

/**
 * Gera um array de opções de datas a partir de hoje até daysAhead dias
 */
export function generateDateOptions(
    startDate: Date = new Date(),
    daysAhead: number = 30
): DateSelectOption[] {
    const options: DateSelectOption[] = [];

    for (let i = 0; i <= daysAhead; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);

        const dateValue = dateToDateValue(currentDate);
        options.push({
            value: dateValue,
            label: formatDate(dateValue.day, dateValue.month, dateValue.year),
        });
    }

    return options;
}

/**
 * Encontra uma opção de data pelo seu label
 */
export function findDateOptionByLabel(
    options: DateSelectOption[],
    label: string
): DateSelectOption | undefined {
    return options.find(option => option.label === label);
}

/**
 * Formata o valor de data selecionado para string
 */
export function formatSelectedDateValue(value?: DateValue): string {
    if (!value) return "";
    return formatDate(value.day, value.month, value.year);
}
