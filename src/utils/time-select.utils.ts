import { TimeSelectOption, TimeValue } from "@/types/scheduling";

/**
 * Formata uma hora e minuto em string HH:MM
 */
export function formatTime(hour: number, minute: number): string {
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

/**
 * Gera um array de opções de horário baseado nos parâmetros
 */
export function generateOptions(
    step: number,
    startHour: number,
    endHour: number
): TimeSelectOption[] {
    const options: TimeSelectOption[] = [];

    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += step) {
            options.push({
                value: { hour, minute },
                label: formatTime(hour, minute),
            });
        }
    }

    return options;
}

/**
 * Encontra uma opção pelo seu label
 */
export function findOptionByLabel(
    options: TimeSelectOption[],
    label: string
): TimeSelectOption | undefined {
    return options.find(option => option.label === label);
}

/**
 * Formata o valor selecionado para string
 */
export function formatSelectedValue(value?: TimeValue): string {
    if (!value) return "";
    return `${String(value.hour).padStart(2, "0")}:${String(value.minute).padStart(2, "0")}`;
}
