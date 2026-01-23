import { TimeSelectOption, TimeValue, TimeSlotGroup, TimePeriod } from "@/types/scheduling";

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
                available: true,
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

/**
 * Determina o período do dia baseado na hora
 */
export function getPeriod(hour: number): TimePeriod {
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
}

/**
 * Agrupa as opções de horário por período do dia
 */
export function groupOptionsByPeriod(options: TimeSelectOption[]): TimeSlotGroup[] {
    const groups: Record<TimePeriod, TimeSelectOption[]> = {
        morning: [],
        afternoon: [],
        evening: [],
    };

    options.forEach(option => {
        const period = getPeriod(option.value.hour);
        groups[period].push(option);
    });

    const periodLabels: Record<TimePeriod, string> = {
        morning: 'Manhã',
        afternoon: 'Tarde',
        evening: 'Noite',
    };

    return Object.entries(groups)
        .filter(([_, slots]) => slots.length > 0)
        .map(([period, slots]) => ({
            period: period as TimePeriod,
            label: periodLabels[period as TimePeriod],
            slots,
        }));
}

