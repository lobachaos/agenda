export type TimeValue = {
    hour: number;    // 0–23
    minute: number;  // 0–59
};

export type DateValue = {
    day: number;     // 1–31
    month: number;   // 1–12
    year: number;    // YYYY
};

export type TimeSelectOption = {
    value: TimeValue;
    label: string;
    available?: boolean;  // true por padrão
};

export type TimePeriod = 'morning' | 'afternoon' | 'evening';

export type TimeSlotGroup = {
    period: TimePeriod;
    label: string;  // "Manhã", "Tarde", "Noite"
    slots: TimeSelectOption[];
};

export type Appointment = {
    id: string;
    clientName: string;
    time: TimeValue;
    date: DateValue;
    period: TimePeriod;
};

export type AppointmentsByPeriod = {
    morning: Appointment[];
    afternoon: Appointment[];
    evening: Appointment[];
};

export type DateSelectOption = {
    value: DateValue;
    label: string;  // Formato: d/M/Y (ex: "22/1/2026")
};
